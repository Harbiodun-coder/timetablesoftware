const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];  // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
      req.user = await User.findById(decoded.id).select('-password');  // Attach user to request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to authorize roles (like 'admin', 'lecturer', 'student')
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });  // User does not have the correct role
    }
    next();
  };
};

module.exports = { protect, authorize };
