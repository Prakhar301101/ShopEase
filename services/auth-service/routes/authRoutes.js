const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const authenticator=require('../middlewares/authMiddleware');


router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.get('/me',authenticator,authController.getUserDetails);
router.patch('/me',authenticator,authController.updateUserDetails);
router.post('/logout',authenticator,authController.logoutUser);


module.exports=router;