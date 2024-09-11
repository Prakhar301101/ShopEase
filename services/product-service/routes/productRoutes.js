const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const { addProduct,addCategory,updateDetails,remove,displayAll,displaySelected,displayCategories } = require('../controllers/prodController');


router.get('/all',displayAll);
router.get('/categories',displayCategories);
router.get('/get/:id',displaySelected);
router.post('/addProduct',authorisation,addProduct);
router.post('/addCategory',authorisation,addCategory);
router.patch('/update/:id',authorisation,updateDetails);
router.delete('/delete/:id',authorisation,remove)

module.exports=router;