const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message:"We are at the order service",
        port:5003
    })
})

app.listen(5003,()=>{
    console.log(`Listening at PORT 5003`);
});