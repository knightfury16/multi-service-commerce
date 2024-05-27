const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().max(99999).default(0).required(),
  stock: Joi.number().default(0).strict(),
  numOfReviews: Joi.number().default(0).strict(),
  ratings: Joi.number().default(0).strict(true)
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().max(100),
  price: Joi.number().max(99999).default(0),
  stock: Joi.number().default(0).strict(),
  numOfReviews: Joi.number().default(0).strict(),
  ratings: Joi.number().default(0).strict(true),
});

module.exports = { productValidationSchema, updateProductValidationSchema };
