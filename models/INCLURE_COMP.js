const mongoose=require('mongoose');

const INCLURE_COMP=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    Comp_id:mongoose.Schema.Types.ObjectId,


})

module.exports=mongoose.model('INCLURE_COMP',INCLURE_COMP);