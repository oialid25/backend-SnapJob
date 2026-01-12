const mongoose=require('mongoose');

const INCLURE_EXP=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    Exp_id:mongoose.Schema.Types.ObjectId,


})

module.exports=mongoose.model('INCLURE_EXP',INCLURE_EXP);