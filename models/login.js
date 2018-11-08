var mongoose=require('mongoose')

const Schema=mongoose.Schema({
   
    password:{type:'string',required:'true'},
    email:{type:'string',required:'true'}
   
})

var userdetail=mongoose.model('login',Schema)

module.exports=userdetail;