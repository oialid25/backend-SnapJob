const mongoose=require('mongoose');

const cardSchema=mongoose.Schema({
    
    username:String,
    id_offre:String,
    
    Description:String,
    userid:String
    


},{timestamps:true})

module.exports=mongoose.model('card',cardSchema);



