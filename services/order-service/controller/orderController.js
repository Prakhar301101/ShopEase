const Order = require('../models/order');

// @desc    Create an Order
// @route   POST /api/order/
// @access  Private

module.exports.createOrder = async (req, res) => {
  //get the cartId in the body
  //extract data from it save in orderModel
  //payment should be set as pending and as soon as you create a order
  //hit the payment service and as you get the result save order with payment status
  return res.status(200).json({ message: 'Order creation route' });
};

// @desc    Get Order details by Id
// @route   GET /api/order/
// @access  Private

module.exports.orderDetailsById = async (req, res) => {
  const { orderId } = req.body;
  if (orderId) {
    try {
      const orderDoc = await Order.findById(orderId);
      if (!orderDoc) {
        return res
          .status(400)
          .json({ message: 'No order present for the given Id' });
      }
      return res.status(200).json({
        message: 'Success',
        orderDoc,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error fetching request, Try again later',
      });
    }
  } else {
    return res.status(400).json({ message: 'Please send the OrderID' });
  }
};

// @desc    Get all the orders of a user
// @route   GET /api/order/all
// @access  Private

module.exports.orderDetails = async (req, res) => {
  try {
    const { userid } = req.user;
    const orderDoc = await Order.find({ user: userid });
    if (orderDoc.length === 0) {
      return res.status(400).json({ message: 'No orders present' });
    }
    return res.status(200).json({
      message: 'Success',
      orderDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Update order status or details
// @route   PATCH  /api/order/
// @access  Private

module.exports.updateOrder = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === 'admin') {
      const { orderId, orderStatus } = req.body;
      if (!orderId || !orderStatus) {
        return res.status(400).json({ message: 'Please give all details' });
      }
      const orderDoc = await Order.findById(orderId);
      if (!orderDoc) {
        return res.status(400).json({ message: 'Wrong OrderID' });
      }
      orderDoc.orderStatus = orderStatus;
      await orderDoc.save();
      return res.status(200).json({ message: 'Order details updated' });
    } else {
      return res
        .status(401)
        .json({ message: 'You are not authorised for this' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};
