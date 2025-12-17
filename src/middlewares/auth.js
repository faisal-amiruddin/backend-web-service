const { verifyToken } = require('../utils/jwt.util');
const { errorResponse } = require('../utils/response.util');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse(res, 'Invalid or expired token', 401);
    }

    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return errorResponse(res, 'Authentication failed', 401);
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return errorResponse(res, 'Access denied. Admin only.', 403);
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};