require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const orderRoutes=require('./routes/orderRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'*',
    credentials:true
}));


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

app.use(orderRoutes);
app.get('/info',(req,res)=>{
    res.json({
        message:"We are at the order service",
        PORT
    })
})

app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});


