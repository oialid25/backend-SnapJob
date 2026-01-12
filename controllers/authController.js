const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();





const registerpage=async(req,res)=>{
    res.render('Signup', { error: null });
}


const register = async (req, res) => {
    try {
        const { first_name, last_name,user_name, email, password,description } = req.body;
        if (!email || !password || !first_name || !last_name || !user_name){ return res.render('Signup', { error: 'you should fille all the gaps' })};
        const finduser = await user.findOne({ user_name: user_name }).exec()
        if (finduser) {
            return res.render('Signup', { error: 'User already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const User = await user.create({
            first_name,
            last_name,
            email,
            password: hashedpassword,
            user_name,
            description
        });

        const accessToken = jwt.sign({ UserInfo: { id: User._id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })

        const refreshToken = jwt.sign({ UserInfo: { id: User._id } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 60 * 60 * 1000 * 24 * 7 })
        User.save()
        
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error)
    }

}

const loginpage=async(req,res)=>{
    res.render('login', { error: null });
}
const login = async (req, res) => {
    try {
        const {user_name, password } = req.body;

        const finduser = await user.findOne({user_name}).exec()
        if (!finduser) {
            return res.render('login', { error: 'this account does not exist' });
        }
        const matchedpassword = await bcrypt.compare(password, finduser.password);
        if(!matchedpassword){
            return res.render('login', { error: 'wrong password' });
        }

        const accessToken = jwt.sign({ UserInfo: { id: finduser._id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })

        const refreshToken = jwt.sign({ UserInfo: { id: finduser._id } }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 60 * 60 * 1000 * 24 * 7 })
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: "None", 
            maxAge: 60 * 60 * 1000 * 24 * 7 
        });
        res.redirect('../user/home/'+finduser._id)
    } catch (error) {
        console.log(error)
    }

}

const refresh=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.status(401).json({massage:"Unauthorized"})
    }
    const refreshTken=cookies.jwt;
    jwt.verify(
        refreshTken,
        process.env.REFRESH_TOKEN_SECRET,
        async (error,decoded)=>{
            if(error){return res.status(403).json({massage:"Forbetin"})}
            const finduser=await user.findById(decoded.UserInfo.id).exec();
            if (!finduser) {return res.status(401).json({ message: 'Invalid credentials' });}
            const accessToken = jwt.sign({ UserInfo: { id: finduser._id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
            res.json({accessToken})
        }
        
    )
}

const logout=(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.redirect('/login');
    }
    res.clearCookie('jwt',{httpOnly:true,sameSite:"None",secure:true})
    res.redirect('/auth/login');
}

module.exports = {
    register,login,refresh,logout,registerpage,loginpage
};










