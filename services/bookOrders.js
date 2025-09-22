const axios = require("axios");
const { json } = require("body-parser");
const { response } = require("express");
const mongoose  = require("mongoose");

const createOrder = async (req, res) => {
    

    let payload = (req.body);
    payload = JSON.stringify(payload[0])
    payload = JSON.parse(payload)
    // console.log(payload);
    
    
  let PL = payload.location || {};
  let PC = payload.Customer || {};
  let PD = Array.isArray(payload.Products) ? payload.Products : [];

  const totalWeight = PD.reduce((sum, p) => {
    const weightStr = p.properties?.find(
      (prop) => prop.name === "weight_per_item"
    )?.value;
    const weight = weightStr ? parseFloat(weightStr) : 0;
    return sum + weight * p.quantity;
  }, 0);

  const mapDetail = {
    shipper_name: PL.name,
    shipper_email: PL.email,
    shipper_contact: PL.phone,
    shipper_address: PL.address,
    shipper_city: PL.city === "Lahore" ? "LHE" : "KHI",
    customer_name: `${PC.shipping?.firstName || ""} ${PC.shipping?.lastName || ""}`.trim(),
    customer_email: PC.email,
    customer_contact: PC.phone,
    customer_address: PC.shipping?.address || "",
    customer_city: (PC.shipping?.city === "Lahore" ? "LHE" : "KHI") || "",
    customer_country: "PK",
    customer_comment: "demo",
    shipping_charges: 150,
    payment_type: payload.paymentMethod === "Credit Card" ? "PP" : "COD",
    service_code: "BE",
    total_order_amount: payload.totalAmountPKR,
    total_order_weight: totalWeight,
    order_refernce_code: payload.orderId,
    fragile: "N",
    parcel_type: "P",
    insurance_require: "N",
    insurance_value: 0,
    testbit: "Y",
    cn_generate: "Y",
    multi_pickup: "Y",
    products_detail: PD.map((p) => ({
      product_code: p.sku,
      product_name: p.name,
      product_price: p.price,
      product_weight:
        p.properties?.find((prop) => prop.name === "weight_per_item")?.value ||
        0.5,
      product_quantity: p.quantity,
      product_variations: PD.categories,
      sku_code: p.sku,
    })),
  };

//   console.log('mapped payload: ',mapDetail);
  
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://bigazure.com/api/json_v3/shipment/create_shipment.php",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic S0hJLTAwMDAwOjY0amt1eWVoNzVoa2pzdGdoODc=",
    },
    data: mapDetail,
  };

  // console.log(mapDetail);

  const response = await axios.request(config);
  console.log(`api response: `, response.data);

  const doc = {
    orderCreationUrl:config.url,
    active: true,
    cn: response.data.cn,
    orderID: payload.orderId,
    mappedPayload: mapDetail,
  };
  if(!response.data.cn){

  }else{
  const result = await mongoose.connection.collection("orders").insertOne(doc);
  }


  return response.data;

}
module.exports = { createOrder };
