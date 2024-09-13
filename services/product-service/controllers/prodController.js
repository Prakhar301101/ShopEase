const Product = require('../models/product');
const Category = require('../models/category');
const redisClient = require('../redisClient');

// @desc    Display All products or by query
// @route   GET /api/products/view?q
// @access  Public

//View by category, price (min-max), attributes(color,size)  ratings average
module.exports.display = async (req, res) => {
  try {
    let queries = {};
    let categoryId = '';
    const { category, priceMin, priceMax, color, size, ratingMin, top } =
      req.query;
    // redis to cache cateogory IDs to reduce frequent MongoDB queries
    if (category) {
      let cache=await redisClient.get(category);
      if (cache!== null) {
        categoryId = cache;
        // console.log("here1",categoryId);
      } else {
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
          return res.status(400).json({ message: 'No such category' });
        }
        categoryId = categoryDoc._id.toString();
        redisClient.set(category, categoryId);
        // console.log("here2",categoryId);
      }
    }

    if (Object.keys(req.query).length > 0) {
      // Category filter
      if (category) queries.category = categoryId;

      // Price filter
      if (priceMin || priceMax) {
        queries.price = {};
        if (priceMin) queries.price.$gte = parseFloat(priceMin);
        if (priceMax) queries.price.$lte = parseFloat(priceMax);
      }

      // Attributes filter (color and size)
      if (color || size) {
        if (color)   queries['attributes.color'] = color;
        if (size)    queries['attributes.size'] = size;
      }

      // Ratings filter
      if (ratingMin) {
        queries.ratings = { average: { $gte: parseFloat(ratingMin) } };
      }
      let products = await Product.find(queries);

      if (top) {
        products = products.slice(0, parseInt(top, 10));
      }

      // Check if products were found
      if (products.length === 0) {
        return res.status(400).json({
          message: 'No products matching your query parameters',
        });
      }

      return res.status(200).json({
        message: 'Success',
        products,
      });
    } else {
      // Fetch all products if no query parameters are provided
      const products = await Product.find();
      if (products.length > 0)
        return res.status(200).json({ message: 'Success', products });
      else return res.status(400).json({ message: 'No Products to display' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    View all Categories
// @route   GET /api/products/categories
// @access  Public

module.exports.displayCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length > 0) {
      return res.status(200).json({
        categories,
      });
    } else {
      return res.status(400).json({
        message: 'No Categories to display',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Display Products with Criterias
// @route   POST /api/products/view?q
// @access  Public

module.exports.displaySelected = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product retrieved successfully',
      product,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error fetching product, try again later' });
  }
};

// @desc    Insert a new Category
// @route   POST /api/products/addCategory
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
        const doc = await Category.findOne({ name });
        if (doc) {
          return res.status(400).json({
            message: 'Category already Exists',
          });
        } else {
          const category_Doc = await Category.create({ name, description });
          if (category_Doc) {
            return res.status(200).json({
              message: 'Creation Successful',
              id: category_Doc._id,
            });
          } else
            return res.status(500).json({
              message: 'Creation Failed!',
            });
        }
      }
    } else {
      return res.status(401).json({
        message: 'Not Authorised!',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Insert a new product
// @route   POST /api/products/addProduct
// @access  Private

module.exports.addProduct = async (req, res) => {
  const Role = req.user.role;
  try {
    if (Role === 'admin') {
      const { name, description, price, category, quantity } = req.body;
      let images = req.body.images;
      let attributes = req.body.attributes;
      let ratings = req.body.ratings;
      if (!name || !description || !price || !category || !quantity) {
        return res.status(400).json({
          message: 'Provide all details',
        });
      } else {
        const prodExists = await Product.find({ name, description });
        if (prodExists) {
          return res
            .status(400)
            .json({
              message:
                'Product with the same details already exists maybe try to update existing product first or change fields and try again',
            });
        }
        const categoryDB = await Category.findOne({ name: category });
        if (categoryDB) {
          //can insert into DB
          const productDB = await Product.create({
            name,
            description,
            price,
            category: categoryDB._id,
            quantity,
            images,
            attributes,
            ratings,
          });
          if (productDB) {
            return res.status(200).json({
              message: 'Product creation successful',
              id: productDB._id,
            });
          } else {
            return res.status(500).json({
              message: 'Product creation Failed!',
            });
          }
        } else {
          //category does not exists
          return res.status(400).json({
            message: 'Given category does not exist, create category first',
          });
        }
      }
    } else {
      return res.status(401).json({
        message: 'Not Authorised!',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: 'Error fetching request, Try again later',
    });
  }
};

// @desc    Update a product by ID
// @route   POST /api/products/update/:id
// @access  Private

module.exports.updateProdDetails = async (req, res) => {};

// @desc    Delete a product by ID
// @route   POST /api/products/delete/:id
// @access  Private

module.exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error deleting product, try again later',
    });
  }
};
