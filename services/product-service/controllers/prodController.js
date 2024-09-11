const Product = require('../models/product');
const Category = require('../models/category');

// @desc    Display All products
// @route   GET /api/product/view
// @access  Public

module.exports.displayAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      console.log(products);
      return res.status(200).json({
        message: 'Success',
      });
    } else {
      return res.status(400).json({
        message: 'No Products to display',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    View all Categories
// @route   GET /api/product/categories
// @access  Public

module.exports.displayCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length > 0) {
      return res.status(200).json({
        categories
      });
    } else {
      return res.status(400).json({
        message: 'No Categories to display',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Display Products with Criterias
// @route   POST /api/product/view?q
// @access  Public

module.exports.displaySelected = async (req, res) => {};

// @desc    Insert a new Category
// @route   POST /api/product/addCategory
// @access  Private

module.exports.addCategory = async (req, res) => {
  const Role = req.user.role;
  try {
    if (Role === 'admin') {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({
          message: 'Provide all details',
        });
      } else {
        const doc =await Category.findOne({ name });
        if (doc) {
            return res.status(400).json({
                message: 'Category already Exists',
              });
        } else {
            const category_Doc=await Category.create({name,description});
            if(category_Doc){
                return res.status(200).json({
                    message:'Creation Successful',
                    id:category_Doc._id
                })
            }
            else return res.status(400).json({
                message:'Creation Failed!'
            })
        }
      }
    } else {
      return res.status(401).json({
        message: 'Not Authorised!',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Insert a new product
// @route   POST /api/product/addProduct
// @access  Private

module.exports.addProduct = async (req, res) => {};

// @desc    Update a product by ID
// @route   POST /api/product/update/:id
// @access  Private

module.exports.updateDetails = async (req, res) => {};

// @desc    Delete a product by ID
// @route   POST /api/product/delete/:id
// @access  Private

module.exports.remove = async (req, res) => {};
