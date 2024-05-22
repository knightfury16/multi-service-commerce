const validUpdate = (req, allowedUpdates) => {
  const updates = Object.keys(req.body);
  return updates.every(item => allowedUpdates.includes(item));
};

module.exports = validUpdate;
