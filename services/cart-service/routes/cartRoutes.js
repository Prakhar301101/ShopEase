const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const {createCart,viewCart,updateCart,deleteItems,clearCart}=require('../controllers/cartController');

router.post('/new',authorisation,createCart);
router.get('/view',authorisation,viewCart);
router.put('/update/:id',authorisation,updateCart);
router.delete('/remove/:id',authorisation,deleteItems);
router.delete('/clear',authorisation,clearCart);

module.exports=router;