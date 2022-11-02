const { Router } = require('express');

const customerRoute = require('./customerRoute.routes');
const sellerRoute = require('./sellerRoute.routes');
const { userController } = require('../../controllers');
const middlewares = require('../../middlewares');
const schemas = require('../../schemas');

const router = Router();

router.post('/login', middlewares.validation(schemas.login), userController.login);
router.post('/register', middlewares.validation(schemas.user), userController.create);
router.use('/customer', customerRoute);
router.use('/seller', sellerRoute);

module.exports = router;
