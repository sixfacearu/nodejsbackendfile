var mongoose=require('mongoose')

const Schema=mongoose.Schema({
    name:{type:'string',required:'true'},
    password:{type:'string',required:'true'},
   
   
})

var adminsignup=mongoose.model('adminsignup',Schema)

module.exports=adminsignup;