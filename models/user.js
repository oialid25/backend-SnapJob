const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String,
    user_name:String,
    description:String,
    isAdmin:{type:Boolean,default:false},
    profilePic:String,
    coverPicture:String,
    followers:[],
    following:[]


},{timestamps:true})

module.exports=mongoose.model('user',userSchema);