const jwt=require('jsonwebtoken');

const authorisation=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        const decoded=jwt.verify(token,process.env.SECRET);
        if(decoded.role==='admin'){
            next();
        }
        else return res.status(400).json({
            message:"You are not authorised for this"
        })
    }
    else{
        return res.status(400).json({
            message:"Login/SignUp first"
        })
    }
}

module.exports=authorisation