const express=require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const {createOrder,orderDetailsById,orderDetails,updateOrder}=require('../controller/orderController');

router.post('/',authorisation,createOrder);
router.get('/',authorisation,orderDetailsById);
router.get('/all',authorisation,orderDetails);
router.patch('/',authorisation,updateOrder);

module.exports=router;