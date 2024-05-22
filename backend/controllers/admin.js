const Joi = require('joi');
const prisma = require('../db/prisma');
const { ALLOWED_ROLES } = require('../utils/constants');

//** getting all users from the db -> api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//** get user by id -> api/admin/users/:id
const getUser = async (req, res) => {
  //convert id from string to number
  const _id = +req.params.id;

  if (isNaN(_id)) {
    res.status(400).send({ Error: 'Invalid id' });
    return;
  }
  try {
    const user = await prisma.user.findFirst({ where: { id: _id } });
    if (!user) return res.status(404).send();
    else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// ** Update role of user -> api/admin/users/update/:id
const updateRole = async (req, res) => {
  //convert id from string to number
  const _id = +req.params.id;
  try {
    const { role } = await Joi.object({
      role: Joi.string()
        .valid(...ALLOWED_ROLES)
        .required()
    }).validateAsync(req.body);

    // search for user
    const user = await prisma.user.findFirst({ where: { id: _id } });
    if (!user) return res.status(404).send();

    await prisma.user.update({ where: { id: _id }, data: { role } });

    res.status(201).send({ Success: 'Ok' });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// ** Delete user -> api/admin/users/:id
const deleteUser = async (req, res) => {
  //convert id from string to number
  const _id = +req.params.id;
  try {
    // search for user
    const user = await prisma.user.findFirst({ where: { id: _id } });
    if (!user) return res.status(404).send();

    await prisma.user.delete({ where: { id: _id } });
    res.status(202).send({ Success: 'Ok' });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// ** Get all orders -> api/admin/orders
const getAllOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({ include: { orderItems: true } });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateRole,
  deleteUser,
  getAllOrder
};
