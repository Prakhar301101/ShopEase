require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'*',
    credentials:true
}));


app.get('/info',(req,res)=>{
    res.json({
        message:"We are at the order service",
        PORT
    })
})

app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
});


/**
 * Order routes
 * POST /  create an order by calling cart
 * then it will make a reqeust to payment service and   * update the order detail accordingly
 * GET /id show order by id
 * GET / show all your orders
 * 
 * 
 */