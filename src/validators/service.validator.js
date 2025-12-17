const Joi = require('joi');

const createServiceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().allow(null, ''),
  order: Joi.number().integer().min(0).default(0),
});

const updateServiceSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  features: Joi.array().items(Joi.string()),
  image: Joi.string().allow(null, ''),
  is_active: Joi.boolean(),
  order: Joi.number().integer().min(0),
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
  validateCreate: validate(createServiceSchema),
  validateUpdate: validate(updateServiceSchema),
};