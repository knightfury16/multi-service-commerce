const express = require('express');
const {
  getAllOrder,
  createNewOrder,
  getSingleOrder,
  getMyOrders
} = require('../controllers/order');
const { auth } = require('../middleware/auth');
const router = express.Router();

// * create new order -> api/order/new
// !Auth1
router.post('/new', auth, createNewOrder);

//* get all orders of logged in user
// !Auth1
router.get('/myOrders', auth, getMyOrders);

//* get single order by id -> api/order/:id
// !Auth1
router.get('/:id', auth, getSingleOrder);



module.exports = router;
