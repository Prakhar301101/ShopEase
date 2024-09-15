require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const PORT=process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
  }));


//info route
app.get('/',(req,res)=>{
    res.json({
        message:"We are at the cart service",
        PORT
    })
})

//database connection
const connectToDB=()=>{ 
    try{
        mongoose.connect(process.env.MONGO_URI);
    }
    catch(err){
        console.error(err)
    }
}

connectToDB();



app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});

