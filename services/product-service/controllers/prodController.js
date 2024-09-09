const product=require('../models/product');
const category=require('../models/category');

// @desc    Display All products
// @route   GET /api/product/view
// @access  Public

module.exports.displayAll= async (req,res)=>{

}


// @desc    Display with Criterias
// @route   POST /api/product/view?q
// @access  Public

module.exports.displaySelected= async (req,res)=>{

}



// @desc    Insert a new Category
// @route   POST /api/product/addCategory
// @access  Private

module.exports.addCategory= async (req,res)=>{

}


// @desc    Insert a new product
// @route   POST /api/product/addProduct
// @access  Private

module.exports.addProduct= async (req,res)=>{

}

// @desc    Update a product by ID
// @route   POST /api/product/update/:id
// @access  Private

module.exports.updateDetails= async (req,res)=>{

}

// @desc    Delete a product by ID
// @route   POST /api/product/delete/:id
// @access  Private

module.exports.remove= async (req,res)=>{

}