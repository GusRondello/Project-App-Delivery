const { Router } = require('express');

const { userController } = require('../controllers');
const middlewares = require('../middlewares');
const schemas = require('../schemas');

const router = Router();

router.post('/login', middlewares.validation(schemas.login), userController.login);
router.post('/register', middlewares.validation(schemas.user), userController.create);

module.exports = router;
// client route
