const mongoose=require('mongoose');

const projectSchema=mongoose.Schema({
    titre:String,
    description:String,
    date:String,
    userid:String


},{timestamps:true})

module.exports=mongoose.model('project',projectSchema);


//i will not use in it 