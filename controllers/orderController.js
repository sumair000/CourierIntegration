const { createOrder } = require("../services/bookOrders");
const { cancelOrder } = require("../services/cancelOrders");
const { trackOrder } = require("../services/trackOrder");
const { getChannel } = require("../utils/rabbitmq");

const createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req, res);

    const channel = await getChannel();
    const queue = "order.created";
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(result)));
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

module.exports = {
  createOrderController,
  cancelOrderController,
  trackOrderController,
};
