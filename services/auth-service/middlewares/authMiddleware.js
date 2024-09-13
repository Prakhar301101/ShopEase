const user = require('../models/user');
const jwt = require('jsonwebtoken');

  const authenticator = async (req, res, next) => {
  let token = req.cookies.jwt;
  let bearer="";
  if(req.headers.authorization){
    bearer=req.headers.authorization.split("Bearer")[1];
    token=bearer.trim();
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const userId = decoded.userId;
      req.user = await user.findById(userId).select('-password');
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized,no token' });
  }
};

module.exports=authenticator