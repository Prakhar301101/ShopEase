const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    quantity:{
      type:Number,
      required:true
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    attributes: {
      color: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model('product', productSchema);
module.exports = productModel;
