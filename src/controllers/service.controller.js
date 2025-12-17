const ServiceModel = require('../models/service.model');
const { successResponse, errorResponse } = require('../utils/response.util');

class ServiceController {
  static async getAll(req, res, next) {
    try {
      const { is_active } = req.query;
      const services = await ServiceModel.getAll(is_active === 'true' ? true : is_active === 'false' ? false : null);
      return successResponse(res, services, 'Services retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const service = await ServiceModel.findById(req.params.id);
      if (!service) {
        return errorResponse(res, 'Service not found', 404);
      }
      return successResponse(res, service, 'Service retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const serviceData = { ...req.body, created_by: req.user.id };
      const service = await ServiceModel.create(serviceData);
      return successResponse(res, service, 'Service created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const service = await ServiceModel.update(req.params.id, req.body);
      if (!service) {
        return errorResponse(res, 'Service not found', 404);
      }
      return successResponse(res, service, 'Service updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const service = await ServiceModel.delete(req.params.id);
      if (!service) {
        return errorResponse(res, 'Service not found', 404);
      }
      return successResponse(res, null, 'Service deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;