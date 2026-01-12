const mongoose=require('mongoose');

const experienceSchema=mongoose.Schema({
    Date_debut:String,
    Date_fin:String,
    Type:String,
    enterprise:String,
    Poste:String,
    description:String,
    userid:String


},{timestamps:true})

module.exports=mongoose.model('experience',experienceSchema);