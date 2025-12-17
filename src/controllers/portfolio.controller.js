const PortfolioModel = require('../models/portfolio.model');
const { successResponse, errorResponse } = require('../utils/response.util');

class PortfolioController {
  static async getAll(req, res, next) {
    try {
      const { is_active } = req.query;
      const portfolios = await PortfolioModel.getAll(is_active === 'true' ? true : is_active === 'false' ? false : null);
      return successResponse(res, portfolios, 'Portfolios retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const portfolio = await PortfolioModel.findById(req.params.id);
      if (!portfolio) {
        return errorResponse(res, 'Portfolio not found', 404);
      }
      return successResponse(res, portfolio, 'Portfolio retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const portfolioData = { ...req.body, created_by: req.user.id };
      const portfolio = await PortfolioModel.create(portfolioData);
      return successResponse(res, portfolio, 'Portfolio created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const portfolio = await PortfolioModel.update(req.params.id, req.body);
      if (!portfolio) {
        return errorResponse(res, 'Portfolio not found', 404);
      }
      return successResponse(res, portfolio, 'Portfolio updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const portfolio = await PortfolioModel.delete(req.params.id);
      if (!portfolio) {
        return errorResponse(res, 'Portfolio not found', 404);
      }
      return successResponse(res, null, 'Portfolio deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PortfolioController;