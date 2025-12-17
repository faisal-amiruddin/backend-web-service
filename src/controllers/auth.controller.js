const UserModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt.util');
const { generateToken } = require('../utils/jwt.util');
const { successResponse, errorResponse } = require('../utils/response.util');

class AuthController {
  // Login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Check if user is active
      if (!user.is_active) {
        return errorResponse(res, 'Account is deactivated', 403);
      }

      // Compare password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return errorResponse(res, 'Invalid email or password', 401);
      }

      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return successResponse(res, {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      }, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  // Get current user profile
  static async getProfile(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      
      if (!user) {
        return errorResponse(res, 'User not found', 404);
      }

      return successResponse(res, {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
      }, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;