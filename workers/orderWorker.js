const { getChannel } = require("../utils/rabbitmq");
const { createOrder } = require("../services/bookOrders");
const {cancelOrder} = require("../services/cancelOrders");
const {trackOrder} = require("../services/trackOrder");

const connectDB= require('../config/db')

async function startWorker() {

    
    await connectDB();

  const channel = await getChannel();
  const queue = "order";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {

        const headers = msg.properties.headers || {};
        const action = headers.action;
        payload = JSON.parse(msg.content.toString());

        console.log(`received message with action: `, action);

        if (action === "create") {
        await createOrder(Array.isArray(payload) ? payload[0] : payload);
        } else if (action === "cancel") {
        await cancelOrder(Array.isArray(payload) ? payload[0] : payload);
        } else if (action === "track") {
        await trackOrder(payload);
        } else {
        console.warn("Unknown action, skipping:", action);
    }

      channel.ack(msg);
    } catch (err) {
      console.error("Error processing order:", err.message);
      channel.nack(msg, false, false); // reject message
    }
  });

  console.log("order worker started, waiting for messages");
}

module.exports = {startWorker}
