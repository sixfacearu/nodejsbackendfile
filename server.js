const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
var catgory =require('./models/catgory')
var userdetail =require('./models/signup')
var cors=require('cors');
var addqus=require('./models/addqus');
var bcrypt=require('bcrypt');
app.use(cors());
var selcat=require('./models/selcat');
var jwt=require('jsonwebtoken');
mongoose.connect('mongodb://mcq123:mcq123@ds117485.mlab.com:17485/mcq');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));




app.post('/selcat',(req,res)=>{
    var qs=new selcat(req.body)
 
    qs.save()
    .then(result=>{
        res.send("data send successfully")
    })
    .catch(error=>{
        res.status(500).send(console.log("error"))
    })
})

app.get('/gcat',(req,res)=>{
    selcat.find((err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})
app.post('/addqus',(req,res)=>{
  console.log(req.body)   
    var qs=new addqus(req.body)
    
    qs.save()
    .then(result=>{
        res.send("data send successfully")
    })
    .catch(error=>{
        res.status(500).send(console.log("error"))
    })
})
app.get('/getqus/:id',(req,res)=>{
   console.log("yes"  +req.params.id)

    addqus.find({Id:req.params.id},(err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    })
})
// add category
app.post('/addcat',(req,res)=>{
var mydata=new catgory(req.body)
mydata.save()
.then(item=>{
    res.send("data saved successfully")
})
.catch(err=>{
   res.status(500).send(console.log("err"))
})
})


app.post('/Usersignup',(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err) {return res.status(500).json({error:'error'})}else{
        const user=new userdetail({name:req.body.name,email:req.body.email,password:hash})
        user.save().then((result)=>{
            res.status(200).json({
                success:'new user add'
            })
        }).catch(error=>{
            res.status(500).json({
                error:'its not valid'
            })
        })
    }
    })
})

 app.post('/signin', function(req, res){
    userdetail.findOne({email: req.body.email})
    .exec()
    .then(function(userdetail) {
       
        
        
       bcrypt.compare(req.body.password, userdetail.password, function(err, result){
          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
            const token = jwt.sign({id: userdetail._id},'secretkey', { expiresIn: '1h' });
             return res.status(200).json({
                // success: 'Welcome to the JWT Auth'
                token:token
             });
            
          }
          return res.status(401).json({
             failed: 'Unauthorized Access'
          });
       });
    })
    .catch(error => {
       res.status(500).json({
          error: error
       });
    });;
 });

//  app.post('/adminsignup',(req,res)=>{
//     bcrypt.hash(req.body.password,10,(err,hash)=>{
//         if(err) {return res.status(500).json({error:'error'})}else{
//         const adminsignup=new adminsignups({name:req.body.name,password:hash})
//         adminsignup.save().then((result)=>{
//             res.status(200).json({
//                 success:'admin add success'
//             })
//         }).catch(error=>{
//             res.status(500).json({
//                 error:'its not valid'
//             })
//         })
//     }
//     })
// })

// app.post('/adminsignin', function(req, res){
//     adminsignups.findOne({email: req.body.email})
//     .exec()
//     .then(function(adminsignup) {
       
        
        
//        bcrypt.compare(req.body.password, adminsignup.password, function(err, result){
//           if(err) {
//              return res.status(401).json({
//                 failed: 'Unauthorized Access'
//              });
//           }
//           if(result) {
//             const token = jwt.sign({id: adminsignup._id},'secretkey', { expiresIn: '1h' });
//              return res.status(200).json({
//                 // success: 'Welcome to the JWT Auth'
//                 token:token
//              });
            
//           }
//           return res.status(401).json({
//              failed: 'Unauthorized Access'
//           });
//        });
//     })
//     .catch(error => {
//        res.status(500).json({
//           error: error
//        });
//     });;
//  });


app.get('/getuserdetail',(req,res)=>{
    userdetail.find((err,names)=>{
        if(err){
            res.send(err);
        }else{
            res.send(names);
        }
    })
})
app.get('/getcat',(req,res)=>{
    catgory.find((err,names)=>{
        if(err){
            res.send(err);
        }else{
            res.send(names);
        }
    })
})
var port = process.env.PORT || 3000;
app.listen(port);
console.log(port);
