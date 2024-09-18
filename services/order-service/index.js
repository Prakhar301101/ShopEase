const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message:"We are at the order service",
        port:5004
    })
})

app.listen(5004,()=>{
    console.log(`Listening at PORT 5004`);
});