const mongoose=require('mongoose');

const INCLURE_CERT=mongoose.Schema({
    id_card:mongoose.Schema.Types.ObjectId,
    Cert_id:mongoose.Schema.Types.ObjectId,


})

module.exports=mongoose.model('INCLURE_CERT',INCLURE_CERT);