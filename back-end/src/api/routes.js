const { Router } = require('express');

const { userController, productController, saleController } = require('../controllers');
const middlewares = require('../middlewares');
const schemas = require('../schemas');

const router = Router();

router.post('/login', middlewares.validation(schemas.login), userController.login);
router.post('/register', middlewares.validation(schemas.user), userController.create);

router.use(middlewares.auth);

router.get('/customer/products', productController.getAll);
router.post('/customer/checkout', middlewares.validation(schemas.sale), saleController.create);
router.get('/customer/orders', saleController.getUserOrders);
router.get('/customer/orders/:id', saleController.getOrderById);
router.patch('/customer/orders/:id', saleController.updateOrderStatus);

module.exports = router;
