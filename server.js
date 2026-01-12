const express=require('express');
const cookieparse=require('cookie-parser');
const path=require('path');

require('dotenv').config();

const mongoose=require('mongoose');
port=process.env.PORT ||5000;


const app=express();


app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(cookieparse());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/',require('./routes/root'));
app.use('/auth',require('./routes/authRoutes'));
app.use('/user',require('./routes/userRoutes'));

app.all( '',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','404.html'));
})



mongoose
    .connect(process.env.DTABASE_URL)
    .then(()=>{
        console.log('your conected to the DB')
    })
    .catch((e)=>{
        console.log('your can\'t conected to the DB')
    })





app.listen(port,()=>{
    console.log('your conected to http:/localhost:'+port);
} )




