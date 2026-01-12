const jwt=require('jsonwebtoken');
const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(" ")[1];
    } else {
        token = req.cookies?.accessToken; 
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){return res.status(403).json({message:'err'})}
        req.user=decoded.UserInfo.id
        next()
    })
    
}



module.exports=verifyJWT

