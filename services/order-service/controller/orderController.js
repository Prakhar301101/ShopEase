const Order = require('../models/order');

// @desc    Create an Order
// @route   POST /api/order/
// @access  Private

module.exports.createOrder = async (req, res) => {
  try {
    const { userid } = req.user;
    const { address } = req.body;
    const url = 'http://localhost:5003/';
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${req.cookies.jwt}`,
      },
    });
    if (!response.ok) {
      return res.status(400).json({ message: 'Error accessing cart' });
    }
    const { cartDoc } = await response.json();
    let products = [];
    cartDoc.products.forEach((prod) => {
      products.push({
        productId: prod.productId,
        quantity: prod.quantity,
        price: prod.price,
      });
    });
    const order = new Order({
      user: req.user.userid,
      products,
      totalPrice: Math.ceil(cartDoc.totalPrice),
      address,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });
    await order.save();
    const paymentResponse = await fetch('http://localhost:5005/check-out', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${req.cookies.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, totalPrice: order.totalPrice }),
    });
    const paymentData = await paymentResponse.json();
    console.log(paymentData);
    const { message, receipt} = paymentData;
    if (message === 'Failed') {
      order.paymentStatus='failed';
      await order.save();
      return res.status(400).json({
        message: 'Payment Failed',
      });
    }
    order.paymentStatus='successful';
    order.orderStatus='confirmed';
    await order.save();
    await fetch('http://localhost:5003/clear',{
      method:'DELETE',
      credentials:'include',
      headers:{
        Authorization:`Bearer ${req.cookies.jwt}`
      }
    })
    return res.status(200).json({
      message: 'Payment Successful',
      receipt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
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
