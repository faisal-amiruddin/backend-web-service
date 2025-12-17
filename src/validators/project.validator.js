const Joi = require('joi');

const createProjectSchema = Joi.object({
  client_name: Joi.string().required(),
  client_email: Joi.string().email().required(),
  client_phone: Joi.string().allow(null, ''),
  service_type: Joi.string().required(),
  description: Joi.string().required(),
  budget: Joi.number().positive().allow(null),
  deadline: Joi.date().allow(null),
  attachments: Joi.array().items(Joi.string()).allow(null),
});

const updateProjectSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'CANCELLED'),
  notes: Joi.string().allow(null, ''),
  assigned_to: Joi.string().uuid().allow(null),
  budget: Joi.number().positive().allow(null),
  deadline: Joi.date().allow(null),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      error.isJoi = true;
      return next(error);
    }
    next();
  };
};

module.exports = {
  validateCreate: validate(createProjectSchema),
  validateUpdate: validate(updateProjectSchema),
};