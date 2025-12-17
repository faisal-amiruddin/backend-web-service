const { errorResponse } = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Joi validation error
  if (err.isJoi) {
    return errorResponse(
      res,
      'Validation Error',
      400,
      err.details.map((detail) => detail.message)
    );
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // PostgreSQL error
  if (err.code === '23505') {
    return errorResponse(res, 'Duplicate entry', 409);
  }

  if (err.code === '23503') {
    return errorResponse(res, 'Foreign key constraint violation', 400);
  }

  // Default error
  return errorResponse(res, err.message || 'Internal Server Error', err.statusCode || 500);
};

module.exports = errorHandler;