const { getChannel } = require("../utils/rabbitmq");
const { createOrder } = require("../services/bookOrders");
const connectDB= require('../config/db')

async function startWorker() {

    
    await connectDB();

  const channel = await getChannel();
  const queue = "order";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {

        let {action, payload} = msg
       payload = JSON.parse(msg.content.toString());
    //   console.log("processing order:", payload);

      // if payload is an array, unwrap it
      await createOrder(Array.isArray(payload) ? payload[0] : payload);

      channel.ack(msg);
    } catch (err) {
      console.error("Error processing order:", err.message);
      channel.nack(msg, false, false); // reject message
    }
  });

  console.log("order worker started, waiting for messages");
}

module.exports = {startWorker}
