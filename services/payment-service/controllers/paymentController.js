const { STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// @desc    Handle Checkout
// @route   POST /api/payment/check-out
// @access  Private

module.exports.handleCheckout = async (req, res) => {
  try {
    const { username, email } = req.user;
    const { address, totalPrice } = req.body;
    const charge = await stripe.charges.create({
      amount: totalPrice * 100,
      currency: 'inr',
      source: 'tok_mastercard',
      description: `Stripe Payment for ${username}`,
      shipping: {
        name: username,
        address,
      },
    });
    if (charge.status === 'succeeded') {
      return res.status(200).json({
        message: 'success',
        receipt: charge.receipt_url,
      });
    }
    return res.status(400).json({ message: 'Failed' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Cant process payments, service down' });
  }
};
