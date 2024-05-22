const express = require('express');
const router = new express.Router();
const { auth, authorizeRole } = require('../middleware/auth');
const { AUTHORIZED_ROLES } = require('../utils/constants');
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product');

//** get all products from the database
/* 
  -Get(/api/products) -> get all the products
  -Get(/api/products?keyword=apple) -> get all products where name contains the keywors query
  -Get(/api/products?category=Laptop) -> get all products where category is Laptop
  -Get(/api/products?rating=4) -> get all products where rating is greater than or equal 4
  -Get(/api/products?price=1-100) -> get all products where price is gte 1 and lte 100
  -Get(/api/products?page=2) -> get all products of page 2
*/
router.get('/', getAllProducts);

//** get single product by id
router.get('/:id', getSingleProduct);

//** create product
// !Auth2

router.post('/new', auth, authorizeRole(AUTHORIZED_ROLES), createProduct);

//** update single product by id
// !Auth2
router.patch('/:id', auth, authorizeRole(AUTHORIZED_ROLES), updateProduct);

//** delete single product by id
// !Auth2
router.delete('/:id', auth, authorizeRole(AUTHORIZED_ROLES), deleteProduct);

module.exports = router;
