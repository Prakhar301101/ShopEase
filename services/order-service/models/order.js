const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
      address:{
        type:String,
        required:true
      },
      paymentStatus:{
        type:String,
        enum:['pending','successful','failed'],
        required:true
      }
  },
  {
    timestamps: true,
  }
);

const orderModel = model('Order', userSchema);
module.exports = orderModel;
