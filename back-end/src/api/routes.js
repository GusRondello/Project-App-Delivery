const { Router } = require('express');

const { validation, userController } = require('../controllers');
const schemas = require('../schemas');

const router = Router();

router.post('/login', validation(schemas.login), userController.login);
router.post('/register', validation(schemas.user), userController.create);

module.exports = router;
