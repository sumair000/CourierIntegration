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
      message: "order queued to process to create Shipment"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    let payload = req.body;

    const channel = await getChannel();
    const queue = 'order';
    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))

    res.status(202).json({
      message: "order queued to process to cancel Shipment"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const trackOrderController = async (req, res) => {
  try {
    let payload = req.body;

    const channel = await getChannel();
    const queue = 'order';
    await channel.assertQueue(queue, {durable: true});
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)))

    res.status(202).json({
      message : "order queued to process track order"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




module.exports = { createOrderController , cancelOrderController, trackOrderController};