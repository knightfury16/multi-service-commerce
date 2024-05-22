const jwt = require('jsonwebtoken');
const prisma = require('../db/prisma');

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ Error: 'Please authenticate!' });
  }
};

const authorizeRole = ([...role]) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .send({ Error: `Role ${req.user.role} is not allowed to access this resource` });
    }
    next();
  };
};

module.exports = { auth, authorizeRole };
