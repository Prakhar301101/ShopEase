const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message:"We are at the payment service",
        port:5005
    })
})

app.listen(5005,()=>{
    console.log(`Listening at PORT 5005`);
});