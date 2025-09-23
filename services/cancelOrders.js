const mongoose = require("mongoose");
const axios = require("axios");

const cancelOrder = async (pl) => {
  let payload = pl;
//   payload = JSON.stringify(payload[0]);
//   payload = JSON.parse(payload);
//   console.log(payload);

  // console.log(payload);

  const orderID = payload.orderId;

  const order = await mongoose.connection
    .collection("orders")
    .findOne({ order_id: orderID });

  // console.log(order);

  if (!order) {
    throw new Error(`Order not found for orderID: ${orderID}`);
  }

  let data = JSON.stringify({
    consignment_no: order.consignment_no,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://bigazure.com/api/json_v3/cancel/void.php/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic S0hJLTAwMDAwOjY0amt1eWVoNzVoa2pzdGdoODc=",
    },
    data: data,
  };

  const response = await axios.request(config);
  console.log(`api response: `, response.data);
  const doc = { cancelStatus: true };
  const result = await mongoose.connection
    .collection("orders")
    .updateOne({ orderID }, { $set: { active: false } });

  return response.data;
};

module.exports = { cancelOrder };
