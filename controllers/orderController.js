const { createOrder } = require('../services/bookOrders');
const { cancelOrder } = require('../services/cancelOrders');
const { trackOrder } = require('../services/trackOrder');
const {getChannel} = require('../utils/rabbitmq');



const createOrderController = async (req, res) => {
  try {
    let payload = req.body;

  // console.log(`payload sending from controller`, payload);
    
    const channel = await getChannel();
    const queue = 'order';
    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))

    res.status(202).json({
      message: "order queued for processing"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    const result = await cancelOrder(req, res);

    const channel = await getChannel();
    const queue = 'order';
    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(result)))

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const trackOrderController = async (req, res) => {
  try {
    const result = await trackOrder(req, res);

    const channel = await getChannel();
    const queue = 'order';
    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(result)))

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = { createOrderController , cancelOrderController, trackOrderController};