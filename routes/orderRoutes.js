const express = require('express');
const { createOrderController , cancelOrderController, trackOrderController} = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', createOrderController);
router.post('/cancel', cancelOrderController);
router.post('/track', trackOrderController);


module.exports = router;