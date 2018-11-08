var mongoose=require('mongoose')

const Schema=mongoose.Schema({
   
    selcat:{type:'string',required:'true'}
   
})

var selcat=mongoose.model('login',Schema)

module.exports=selcat;