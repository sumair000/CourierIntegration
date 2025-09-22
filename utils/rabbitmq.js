const amqp = require("amqplib");
require("dotenv").config();

let channel = null;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  return channel;
}

async function getChannel() {
  if (!channel) {
    await connectRabbitMQ();
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
