const Cart=require('../models/cart');

// @desc    Create a Cart(Unique for a user)
// @route   POST /api/cart/new
// @access  Private

module.exports.createCart= async (req,res)=>{
    res.status(200).json({message:'create a new Cart'});
}

// @desc    View the Cart
// @route   GET /api/cart/view
// @access  Private

module.exports.viewCart= async (req,res)=>{
    res.status(200).json({message:'Display Cart'});
}

// @desc    Update Items in the cart by productId
// @route   PUT /api/cart/update/:id
// @access  Private

module.exports.updateCart= async (req,res)=>{
    res.status(200).json({message:'Update items in cart'});
}

// @desc    Delete items by productID from cart
// @route   DELETE /api/cart/delete/:id
// @access  Private

module.exports.deleteItems= async (req,res)=>{
    res.status(200).json({message:'Deletes item from cart'});
}

// @desc    Clear the whole cart
// @route   GET /api/cart/clear
// @access  Private

module.exports.clearCart= async (req,res)=>{
    res.status(200).json({message:'Clear the cart'});
}