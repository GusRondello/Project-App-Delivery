const { Router } = require('express');

const { saleController } = require('../../controllers');
const middlewares = require('../../middlewares');

const router = Router();

router.use(middlewares.auth('seller'));
router.get('/orders', saleController.getUserOrders);
router.get('/orders/:id', saleController.getOrderById); 
router.patch('/orders/:id', saleController.updateOrderStatus);

module.exports = router;
