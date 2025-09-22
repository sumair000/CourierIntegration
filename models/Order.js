const {model, Schema} = require('mongoose');

const bookingOrderSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
    required: true
  },
  consignment_no: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true
  },
  mappedPayload: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

module.exports = model('Order', bookingOrderSchema);
