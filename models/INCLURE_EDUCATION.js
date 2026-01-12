const mongoose=require('mongoose');

const INCLURE_EDUCATION=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    Formation_id:mongoose.Schema.Types.ObjectId,


})

module.exports=mongoose.model('INCLURE_EDUCATION',INCLURE_EDUCATION);