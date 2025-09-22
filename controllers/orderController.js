const { createOrder } = require('../services/bookOrders');
const { cancelOrder } = require('../services/cancelOrders');
const { trackOrder } = require('../services/trackOrder');



const createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    const result = await cancelOrder(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const trackOrderController = async (req, res) => {
  try {
    const result = await trackOrder(req, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = { createOrderController , cancelOrderController, trackOrderController};