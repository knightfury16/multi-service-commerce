const express = require('express');
const {
  getAllUsers,
  getUser,
  updateRole,
  deleteUser,
  getAllOrder
} = require('../controllers/admin');
const { auth, authorizeRole } = require('../middleware/auth');
const { AUTHORIZED_ROLES } = require('../utils/constants');
const router = express.Router();

//**  get all users api/admin/users
// !Auth2
router.get('/users', auth, authorizeRole(AUTHORIZED_ROLES), getAllUsers);

//**  get user by id
// !Auth2
router.get('/users/:id', auth, authorizeRole(AUTHORIZED_ROLES), getUser);

// ** Update role of user -> api/admin/users/update/:id
// !Auth2
router.post('/users/update/:id', auth, authorizeRole(AUTHORIZED_ROLES), updateRole);

// ** delete user by id -> api/admin/users/:id
// !Auth2
router.delete('/users/:id', auth, authorizeRole(AUTHORIZED_ROLES), deleteUser);

// * get all orders -> api/admin/orders
// !Auth2
router.get('/orders', auth, authorizeRole(AUTHORIZED_ROLES), getAllOrder);

module.exports = router;
