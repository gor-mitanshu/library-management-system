const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
     const authHeader = req.header('Authorization');
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
     }

     const token = authHeader.split(' ')[1];
     if (!token) {
          return res.status(401).send({ success: false, message: 'Access denied. Invalid token format.' });
     }

     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded.userId;
          next();
     } catch (error) {
          res.status(400).send({ success: false, message: 'Invalid token' });
     }
};

module.exports = authMiddleware;