const mongoose=require('mongoose');

const competenceSchema=mongoose.Schema({
    titre:String,
    Type:String,
    
    niveau:String,
    userid:String
    


},{timestamps:true})

module.exports=mongoose.model('competence',competenceSchema);