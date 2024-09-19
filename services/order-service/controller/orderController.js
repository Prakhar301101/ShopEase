const Order=require('../models/order');

// @desc    Create an Order
// @route   POST /api/order/
// @access  Private

module.exports.createOrder=async (req,res)=>{
    return res.status(200).json({message:"Order creation route"});
}

// @desc    Get Order details by Id 
// @route   GET /api/order/:id
// @access  Private

module.exports.orderDetailsById=async (req,res)=>{
    return res.status(200).json({message:"Order details by ID route"});
}


// @desc    Get all the orders of a user     
// @route   GET /api/order/
// @access  Private

module.exports.orderDetails=async (req,res)=>{
    return res.status(200).json({message:"All order details route"});
}


// @desc    Update order status or details     
// @route   PATCH  /api/order/
// @access  Private

module.exports.updateOrder=async (req,res)=>{
    return res.status(200).json({message:"update order details route"});
}


