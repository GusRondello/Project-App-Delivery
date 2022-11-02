const { Router } = require('express');

const { productController, saleController, userController } = require('../../controllers');
const middlewares = require('../../middlewares');
const schemas = require('../../schemas');

const router = Router();

router.use(middlewares.auth('customer'));
router.get('/products', productController.getAll);
router.post('/checkout', middlewares.validation(schemas.sale), saleController.create);
router.get('/sellers', userController.getSellers);
router.get('/orders', saleController.getUserOrders);
router.get('/orders/:id', saleController.getOrderById);
router.patch('/orders/:id', saleController.updateOrderStatus);

module.exports = router;
