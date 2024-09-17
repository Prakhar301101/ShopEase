const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const {viewCart,addToCart,updateCart,deleteItems,clearCart}=require('../controllers/cartController');

router.get('/',authorisation,viewCart);
router.post('/add',authorisation,addToCart);
router.patch('/update',authorisation,updateCart);
router.delete('/remove',authorisation,deleteItems);
router.delete('/clear',authorisation,clearCart);

module.exports=router;