var mongoose=require('mongoose');


var schema=new mongoose.Schema({
    Id:{type:'string',required:'true'},
    category:{type:'string',required:'true'},
    tot_qus:{type:'string',required:'true'}
})

var catgory=mongoose.model("catgory",schema);
module.exports = catgory;