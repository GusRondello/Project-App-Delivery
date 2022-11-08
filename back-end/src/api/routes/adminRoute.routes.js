const { Router } = require('express');

const { userController } = require('../../controllers');
const middlewares = require('../../middlewares');
const schemas = require('../../schemas');

const router = Router();

router.use(middlewares.auth('administrator'));
router.post(
  '/create-user',
  middlewares.validation(schemas.userWithRole),
  userController.create,
);
router.get('/users', userController.getAllUsers);

module.exports = router;
