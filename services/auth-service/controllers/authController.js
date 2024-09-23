const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, process.env.SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public

module.exports.registerUser = async (req, res) => {
  const { username, password, email, age, gender, role } = req.body;
  if (!username || !password || !email || !age || !gender || !role) {
    console.log('Please provide all user details');
    return res.status(400).json({ message: 'Please provide all user details' });
  }
  try {
    let lowercaseGender = gender.toLowerCase();
    let lowercaseRole = role.toLowerCase();
    const userExists = await user.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      console.log('try different details');
      return res.status(400).json({
        message: 'User with same credentials exists try different values',
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPass = await bcrypt.hash(password, salt);
      const userDoc = await user.create({
        username,
        password: hashedPass,
        email,
        age,
        gender: lowercaseGender,
        role: lowercaseRole,
      });
      if (userDoc) {
        const token = generateToken(
          userDoc._id,
          userDoc.username,
          userDoc.role
        );
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return res.status(200).json({
          message: 'Profile Created',
          _id: userDoc._id,
          name: userDoc.username,
          role: userDoc.role,
        });
      } else {
        return res.status(400).json({
          message: 'Invalid user',
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    login user
// @route   POST /api/user/login
// @access  Public

module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Please provide all user details');
    res.status(400).json({ message: 'Please provide all user details' });
  }
  try {
    const userDoc = await user.findOne({ username });
    if (userDoc && (await bcrypt.compare(password, userDoc.password))) {
      const token = generateToken(userDoc._id, userDoc.name, userDoc.role);
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.status(200).json({
        _id: userDoc._id,
        name: userDoc.username,
      });
    } else {
      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user details
// @route   GET /api/user/me
// @access  Private

module.exports.getUserDetails = async (req, res) => {
  try {
    const userDoc = await user.findById(req.user._id);
    if (!userDoc) {
      return res.status(400).json({ message: 'User not found' });
    }
    return res.status(200).json({
      id: userDoc._id,
      username: userDoc.username,
      email: userDoc.email,
      gender: userDoc.gender,
      role: userDoc.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user details
// @route   PATCH /api/user/me
// @access  Private

module.exports.updateUserDetails = async (req, res) => {
  const data = req.body;
  try {
    const userDoc = await user.findById(req.user.id);
    if (!userDoc) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (data.username) userDoc.username = data.username;
    if (data.email) userDoc.email = data.email;
    if (data.age) userDoc.age = data.age;
    if (data.gender) userDoc.gender = data.gender;
    await userDoc.save();
    res.status(200).json({ message: 'Changes saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/user/logout
// @access  Private

module.exports.logoutUser = async (req, res) => {
  res
    .cookie('jwt', '', {
      httpOnly: true,
    })
    .json({ message: 'Logout Successful' });
  return res.status(200).json({ message: 'Logout Successful' });
};

// @desc    Verify role
// @route   GET /api/user/verify
// @access  Private

module.exports.getRole = (req, res) => {
  try {
    const {_id,role,username,email}=req.user;
    return res.status(200).json({
      message: 'User Role Info',
      role,
      userid:_id,
      username,
      email
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error processing request'
    });
  }
};
