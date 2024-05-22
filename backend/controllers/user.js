const bcrypt = require('bcrypt');
const Joi = require('joi');
const { ALLOWED_USER_UPDATE } = require('../utils/constants');
const generateToken = require('../utils/generateToken');
const sendToken = require('../utils/sendToken');
const {
  userValidationSchema,
  updateUserValidationSchema
} = require('../utils/userValidationSchema');
const validUpdate = require('../utils/validUpdate');
const prisma = require('./../db/prisma');

// ** login -> api/user/login
//login user by searching email in the db and then comparing password has and password in db
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) return res.status(404).send();

    // compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send({ Error: 'Invalid credentials.' });

    sendToken(res, user, 200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//** Register -> api/user/register
//getting information from the c;ientr and creating a new user and storing in db
const register = async (req, res) => {
  try {
    // validate data
    const data = await userValidationSchema.validateAsync(req.body);

    // hash password
    data.password = await bcrypt.hash(data.password, 10);

    // create user
    const user = await prisma.user.create({ data });

    sendToken(res, user, 201);
  } catch (error) {
    if (error.code === 'P2002') return res.status(400).send({ Error: 'Email taken!' });
    res.status(500).json({
      Error: error.message
    });
  }
};

//** logout -> api/user/logout
const logout = async (req, res) => {
  res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).send('logged out');
};

//** get user profile -> api/user/me
const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.user.id } });

    // delete password field from user body
    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//**  update password -> api/user/password/update
const updatePassword = async (req, res) => {
  try {
    // validating the request body
    let { oldPassword, newPassword } = await Joi.object({
      oldPassword: Joi.string()
        .min(6)
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      newPassword: Joi.string()
        .min(6)
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required()
    }).validateAsync(req.body);

    // checking the old password
    const isValid = await bcrypt.compare(oldPassword, req.user.password);
    if (!isValid) return res.status(400).send({ Error: 'Invalid credentials.' });

    // hashing new password
    newPassword = await bcrypt.hash(newPassword, 10);

    // setting the new password
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { password: newPassword }
    });

    // sending new token after updating password
    sendToken(res, user, 201);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//** update user profile -> api/user/update/me
const updateUserProfile = async (req, res) => {
  if (!validUpdate(req, ALLOWED_USER_UPDATE))
    return res.status(400).send({ Error: 'Invalid updates' });

  try {
    const data = await updateUserValidationSchema.validateAsync(req.body);
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

module.exports = {
  login,
  register,
  logout,
  updateUserProfile,
  getUserProfile,
  updatePassword
};
