const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');


router.post('/add',authorisation,()=>{
    console.log("Testing");
});
// router.get('/get',);
// router.get('/get/:id',);
// router.patch('/update/:id',authorisation,);
// router.delete('/delete/:id',authorisation,)

module.exports=router;