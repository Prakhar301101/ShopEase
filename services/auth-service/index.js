require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose=require('mongoose');
const PORT=process.env.PORT;
const authRoutes=require('./routes/authRoutes');

app.use(express.json());

app.use(cors({
    origin: '*',
    credentials: true
  }));
app.use(cookieParser());

app.get('/info',(req,res)=>{
    res.json({
        message:"We are at the auth service",
        port:PORT
    })
})

//database connections
const connectToDB=()=>{ 
    try{
        mongoose.connect(process.env.MONGO_URI);
    }
    catch(err){
        console.error(err)
    }
}

connectToDB();
app.use(authRoutes);


app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});