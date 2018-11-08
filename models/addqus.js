var mongoose=require('mongoose')

const Schema=mongoose.Schema({
    Id:{type:'string',required:'true'},
    noofqs:{type:'string',require:'true'},
    question:{type:'string',required:'true'},
    option1:{type:'string',required:'true'},
    option2:{type:'string',required:'true'},
    option3:{type:'string',required:'true'},
    option4:{type:'string',required:'true'},
    key:{type:'string',required:'true'},
   
   
})

var addqus=mongoose.model('quslist',Schema)

module.exports=addqus;