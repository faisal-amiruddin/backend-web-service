const Joi = require('joi');

const createPortfolioSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  client_name: Joi.string().allow(null, ''),
  project_url: Joi.string().uri().allow(null, ''),
  image: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  order: Joi.number().integer().min(0).default(0),
});

const updatePortfolioSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  client_name: Joi.string().allow(null, ''),
  project_url: Joi.string().uri().allow(null, ''),
  image: Joi.string(),
  tags: Joi.array().items(Joi.string()),
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
  validateCreate: validate(createPortfolioSchema),
  validateUpdate: validate(updatePortfolioSchema),
};