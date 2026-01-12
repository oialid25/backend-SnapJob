const express=require('express');
const routes=express.Router();
const path=require('path');



routes.get('/',(req,res)=>{
    
    res.redirect('/auth/login')
})

module.exports=routes