const mongoose=require('mongoose');

const offreSchema=mongoose.Schema({
    titre:String,
    type_emploi:String,
    Description:String,
    lieu_travail:String,
    userid:String,
    username: String,
    profilePic: String
    


},{timestamps:true})

module.exports=mongoose.model('offre',offreSchema);