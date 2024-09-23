const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// @desc    Handle Checkout
// @route   POST /api/payment/check-out
// @access  Private

module.exports.handleCheckout = async (req, res) => {
  try {
    const { username, email } = req.user;
    const {number,exp_month,exp_year,cvc}=req.body.cardDetails;
    const customer = await stripe.customers.create({
      name: username,
      email,
    });
    // get the customer
    const customerId = customer.id;

    // const token = await stripe.tokens.create({
    //   card: {
    //     name:username,
    //     number,
    //     exp_month,
    //     exp_year,
    //     cvc,
    //   },
    // });

    // console.log(token);
    // const paymentIntent = await stripe.paymentIntents.create({
    // amount: 50000,
    //   currency: 'inr',
    //   payment_method: 'pm_card_visa',
    // });

    return res.status(200).json({ message: 'success', paymentIntent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Cant process payments, service down' });
  }
};
