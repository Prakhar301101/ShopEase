require('dotenv').config();
const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const PORT=process.env.PORT;
const cartRoutes=require('./routes/cartRoutes');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
  }));


//info route
app.get('/info',(req,res)=>{
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
app.use(cartRoutes);


app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});

