const Joi = require('joi');

const productValidationSchema = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().max(99999).default(0).required(),
  description: Joi.string().required(),
  stock: Joi.number().default(0).strict(),
  numOfReviews: Joi.number().default(0).strict(),
  ratings: Joi.number().default(0).strict(true),
  category: Joi.string()
    .valid(
      'Electronics',
      'Laptop',
      'Cameras',
      'Accessories',
      'Headphones',
      'Food',
      'Books',
      'Clothes',
      'Beauty',
      'Health',
      'Sports',
      'Outdoors',
      'Home'
    )
    .required()
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().max(100),
  price: Joi.number().max(99999).default(0),
  description: Joi.string(),
  stock: Joi.number().default(0).strict(),
  numOfReviews: Joi.number().default(0).strict(),
  ratings: Joi.number().default(0).strict(true),
  category: Joi.string().valid(
    'Electronics',
    'Laptop',
    'Cameras',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes',
    'Beauty',
    'Health',
    'Sports',
    'Outdoors',
    'Home'
  )
});

module.exports = { productValidationSchema, updateProductValidationSchema };
