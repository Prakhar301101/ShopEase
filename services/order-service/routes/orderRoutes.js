const express=require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const {createOrder,orderDetailsById,orderDetails,updateOrder}=require('../controller/orderController');

router.post('/',authorisation,createOrder);
router.get('/:id',authorisation,orderDetailsById);
router.get('/',authorisation,orderDetails);
router.patch('/',authorisation,updateOrder);