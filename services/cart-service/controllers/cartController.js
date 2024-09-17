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
// @route   POST /api/cart/add
// @access  Private

module.exports.addToCart = async (req, res) => {
  try {
    const { userid } = req.user;
    let { productId } = req.body;
    let cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      cartDoc = new Cart({
        user: userid,
        products: [],
        totalPrice: 0,
      });
    }
    const url = `http://localhost:5002/view/${productId}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    const prodDoc = await response.json();
    const prod = prodDoc.product;
    if (prod.quantity === 0) {
      return res.status(400).json({ message: 'Product is Out of stock' });
    }

    for (let i = 0; i < cartDoc.products.length; i++) {
      let productInCartId = cartDoc.products[i].productId.toString();
      if (productInCartId === productId) {
        return res
          .status(400)
          .json({ message: 'Item already in cart, try updating the count' });
      }
    }
    const product = {
      productId: prod._id,
      quantity: 1,
      price: prod.price,
    };
    cartDoc.products.push(product);
    cartDoc.totalPrice += prod.price;

    await cartDoc.save();

    return res.status(200).json({
      message: 'Items added successfully',
      cart: cartDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error processing the request, try again later',
    });
  }
};

// @desc    Increment or Decrement items in the cart by productId
// @route   PATCH /api/cart/update
// @access  Private

module.exports.updateCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productId, operation } = req.body;
    let cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      return res.status(400).json({ message: 'First add items in cart' });
    }
    let { products } = cartDoc;
    let flag = 0;
    for (let i = 0; i < products.length; i++) {
      let productInCartId = products[i].productId.toString();
      if (productInCartId === productId) {
        if (operation === '+') {
          products[i].quantity += 1;
          cartDoc.totalPrice += products[i].price;
        } else {
          products[i].quantity -= 1;
          cartDoc.totalPrice -= products[i].price;
          if (products[i].quantity === 0) flag = 1;
        }
      }
    }
    if (flag === 1) {
      let updatedProducts = products.filter((item) => {
        return item.quantity !== 0;
      });
      cartDoc.products = updatedProducts;
    }
    await cartDoc.save();
    return res.status(200).json({
      message: 'Item updation successful',
      cart: cartDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error processing the request, try again later',
    });
  }
};

// @desc    Delete items by productID from cart
// @route   DELETE /api/cart/remove
// @access  Private

module.exports.deleteItems = async (req, res) => {
  try {
    const { userid } = req.user;
    const { productId } = req.body;
    let cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      return res.status(400).json({ message: 'First add items in cart' });
    }
    const { products } = cartDoc;
    let updatedProducts = products.filter((item) => {
      return item.productId.toString() !== productId;
    });
    cartDoc.products = updatedProducts;
    let tot = 0;
    for (let i = 0; i < updatedProducts.length; i++) {
      tot = tot + updatedProducts[i].quantity * updatedProducts[i].price;
    }
    cartDoc.totalPrice = tot;
    await cartDoc.save();
    return res.status(200).json({
      message: 'item deletion successful',
      cart: cartDoc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error processing the request, try again later',
    });
  }
};

// @desc    Clear the whole cart
// @route   DELETE /api/cart/clear
// @access  Private

module.exports.clearCart = async (req, res) => {
  try {
    const { userid } = req.user;
    const cartDoc = await Cart.findOne({ user: userid });
    if (!cartDoc) {
      return res.status(400).json({
        message: 'Add a product to access the cart',
      });
    }
    cartDoc.products = [];
    cartDoc.totalPrice = 0;
    await cartDoc.save();
    return res.status(200).json({
      message: 'Cart cleared',
      products: cartDoc.products,
      totalPrice: cartDoc.totalPrice,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};
