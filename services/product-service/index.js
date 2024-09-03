require('dotenv').config()
const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const prodRoutes=require('./routes/productRoutes');
const PORT=process.env.PORT

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
  }));
app.use(cookieParser());

app.get('/info',(req,res)=>{
    res.json({
        message:"We are at the product service",
        PORT
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
app.use(prodRoutes);


app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});