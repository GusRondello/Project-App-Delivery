const { Router } = require('express');

const { userController, productController } = require('../controllers');
const middlewares = require('../middlewares');
const schemas = require('../schemas');

const router = Router();

router.post('/login', middlewares.validation(schemas.login), userController.login);
router.post('/register', middlewares.validation(schemas.user), userController.create);
router.get('/customer/products', middlewares.auth, productController.getAll);

module.exports = router;
