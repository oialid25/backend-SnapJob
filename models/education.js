const mongoose=require('mongoose');

const educationSchema=mongoose.Schema({
    ecole:String,
    diplome:String,
    date_debut:String,
    date_fin:String,
    Grade:String,
    Description:String,
    userid:String


},{timestamps:true})

module.exports=mongoose.model('education',educationSchema);