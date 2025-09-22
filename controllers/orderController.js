const { createOrder } = require('../services/bookOrders');

const createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req, res);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createOrderController };