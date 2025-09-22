const { getChannel } = require("../utils/rabbitmq");
const connectDB = require("../config/db");

async function startWorker() {
  const channel = await getChannel();
  const queue = "order.created";
  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    const orderData = JSON.parse(msg.content.toString());
    console.log(`processing order:`, orderData);

    channel.ack(msg);
  });
  console.log(`order worker started , waiting for messages`);
}

startWorker();
