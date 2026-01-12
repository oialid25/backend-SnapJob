const mongoose=require('mongoose');

const INCLURE_PROJ=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    title:mongoose.Schema.Types.ObjectId,


})

module.exports=mongoose.model('INCLURE_PROJ',INCLURE_PROJ);