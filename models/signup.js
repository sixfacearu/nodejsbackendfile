var mongoose=require('mongoose')

const Schema=mongoose.Schema({
    name:{type:'string',required:'true'},
    password:{type:'string',required:'true'},
    email:{type:'string',required:'true'}
   
})

var userdetail=mongoose.model('Usersignup',Schema)

module.exports=userdetail;