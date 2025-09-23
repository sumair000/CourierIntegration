require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const orderRoute = require("./routes/orderRoutes");
const { connectRabbitMQ } = require("./utils/rabbitmq");
const { startWorker } = require("./workers/orderWorker");
(async () => {
  const app = express();

  await connectRabbitMQ();
//   connectDB();
  startWorker();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send({ message: "API working..." });
  });

  app.use("/api", orderRoute);

  app.listen(process.env.PORT, () => {
    console.log(`server is up...`);
  });
})();
