const mongoose=require('mongoose');

const capabilitieSchema=mongoose.Schema({
    title:String,
    type:String,
    niveau:String,
    userid:String


},{timestamps:true})

module.exports=mongoose.model('capabilitie',capabilitieSchema);