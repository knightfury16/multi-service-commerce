const prisma = require('../db/prisma');

// * create new order
exports.createNewOrder = async (req, res) => {
  try {
    // TODO: Add data validation
    const { orderItems } = req.body;
    delete req.body.orderItems;

    const order = await prisma.order.create({
      data: {
        ...req.body,
        userId: req.user.id,
        orderItems: {
          createMany: { data: [...orderItems] }
        }
      }
    });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ Error: error.messgae });
  }
};

// * get single order by id
exports.getSingleOrder = async (req, res) => {
  try {
    const _id = +req.params.id;
    const order = await prisma.order.findFirst({
      where: { id: _id },
      include: { orderItems: true }
    });

    if (!order) return res.status(404).send();

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

// * get all the orders of logged in user
exports.getMyOrders = async (req, res) => {
  console.log('from all my orders: ', req.user.id);
  try {
    const orders = await prisma.order.findMany({
      where: { userId: +req.user.id },
      include: { orderItems: true }
    });

    if (!orders) return res.status(404).send();

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Error: error.message });
  }
};

