const express=require('express');
const router=express.Router();
const {handleCheckout}=require('../controllers/paymentController');
const authorisation=require('../middlewares/authorisation')

router.post('/check-out',authorisation,handleCheckout);

module.exports=router;