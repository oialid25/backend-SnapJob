const mongoose=require('mongoose');

const statueSchema=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    user_name:String, 
    status:String, 
    id_offre:mongoose.Schema.Types.ObjectId

},{timestamps:true})

module.exports=mongoose.model('statue',statueSchema);