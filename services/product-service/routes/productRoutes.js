const express =require('express');
const router=express.Router();
const authorisation=require('../middlewares/authorisation');
const { addProduct,addCategory,updateProdDetails,remove,display,displaySelected,displayCategories } = require('../controllers/prodController');


router.get('/view',display);
router.get('/view/:id',displaySelected);
router.get('/categories',displayCategories);
router.post('/addProduct',authorisation,addProduct);
router.post('/addCategory',authorisation,addCategory);
router.patch('/update/:id',authorisation,updateProdDetails);
router.delete('/delete/:id',authorisation,remove)

module.exports=router;