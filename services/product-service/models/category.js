const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
      },
      description: {
        type: String,
        trim: true,
        maxlength: 200,
      },
},
{
timestamps:true
});

const categoryModel= model('Category',categorySchema);

module.exports=categoryModel;