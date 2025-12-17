const ProjectModel = require('../models/project.model');
const { successResponse, errorResponse } = require('../utils/response.util');

class ProjectController {
  static async getAll(req, res, next) {
    try {
      const { status } = req.query;
      const projects = await ProjectModel.getAll(status);
      return successResponse(res, projects, 'Projects retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const project = await ProjectModel.findById(req.params.id);
      if (!project) {
        return errorResponse(res, 'Project not found', 404);
      }
      return successResponse(res, project, 'Project retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Public endpoint - Client can submit project without login
  static async create(req, res, next) {
    try {
      const project = await ProjectModel.create(req.body);
      return successResponse(res, project, 'Project submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  // Admin only - Update project status, assign, etc
  static async update(req, res, next) {
    try {
      const project = await ProjectModel.update(req.params.id, req.body);
      if (!project) {
        return errorResponse(res, 'Project not found', 404);
      }
      return successResponse(res, project, 'Project updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const project = await ProjectModel.delete(req.params.id);
      if (!project) {
        return errorResponse(res, 'Project not found', 404);
      }
      return successResponse(res, null, 'Project deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProjectController;