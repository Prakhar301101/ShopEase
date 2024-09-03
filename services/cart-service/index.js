const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.json({
        message:"We are at the cart service",
        port:5002
    })
})

app.listen(5002,()=>{
    console.log(`Listening at PORT 5002`);
});