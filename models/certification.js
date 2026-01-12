const mongoose=require('mongoose');

const certificationSchema=mongoose.Schema({
    titre:String,
    organisme:String,
    userid:mongoose.Schema.Types.ObjectId


},{timestamps:true})

module.exports=mongoose.model('certification',certificationSchema);