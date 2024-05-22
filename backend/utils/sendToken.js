const generateToken = require('./generateToken');

const sendToken = (res, user, statusCode) => {
  // generate token
  const token = generateToken(user.id);

  // set cookie, httpOnly important
  res.cookie('token', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true
  });

  // sending final response
  res.status(statusCode).send({ user, token });
};

module.exports = sendToken;
