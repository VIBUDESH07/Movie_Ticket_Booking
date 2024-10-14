// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // Attach the decoded user (payload) to the request object
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
