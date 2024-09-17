const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const {viewCart,addToCart,updateCart,deleteItems,clearCart}=require('../controllers/cartController');

router.get('/',authorisation,viewCart);
router.put('/add/:id',authorisation,addToCart);
router.put('/update/:id',authorisation,updateCart);
router.delete('/remove/:id',authorisation,deleteItems);
router.delete('/clear',authorisation,clearCart);

module.exports=router;