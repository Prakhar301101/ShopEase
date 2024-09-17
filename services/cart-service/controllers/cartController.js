const Cart = require('../models/cart');

// @desc    View the Cart
// @route   GET /api/cart/
// @access  Private

module.exports.viewCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      return res.status(400).json({
        message: 'Add a product to access the cart',
      });
    }
    res.status(200).json({
      message: 'success',
      cartDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Add item to cart by prodID
// @route   GET /api/cart/add/:id
// @access  Private

module.exports.addToCart = async (req, res) => {
  try {
    const { userid } = req.user;
    // const{productId,quantity}=req.body;
    // let cartDoc = await Cart.find({ user: userid });
    // if(!cartDoc){
    //      cart= new Cart({
    //         user:userid,
    //         products:[],
    //         totalPrice:0
    //     })
    // }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Update Items in the cart by productId
// @route   PUT /api/cart/update/:id
// @access  Private

module.exports.updateCart = async (req, res) => {
  res.status(200).json({ message: 'Update items in cart' });
};

// @desc    Delete items by productID from cart
// @route   DELETE /api/cart/delete/:id
// @access  Private

module.exports.deleteItems = async (req, res) => {
  res.status(200).json({ message: 'Deletes item from cart' });
};

// @desc    Clear the whole cart
// @route   DELETE /api/cart/clear
// @access  Private

module.exports.clearCart = async (req, res) => {
  //   res.status(200).json({ message: 'Clear the cart' });
  try {
    const { userid } = req.user;
    const cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      return res.status(400).json({
        message: 'Add a product to access the cart',
      });
    }
    cartDoc.products=[];
    cartDoc.totalPrice=0;
    await cartDoc.save();
    return res.status(200).json({
        message:'Cart cleared',
        products:cartDoc.products,
        totalPrice:cartDoc.totalPrice
    })    

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};
