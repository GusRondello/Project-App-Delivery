const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { Boom } = require('@hapi/boom');

const expect = chai.expect
chai.use(sinonChai);

const testController = require('../helpers/testController');
const { validation } = require('../../middlewares');
const schemas= require('../../schemas');

describe('Validation schema middleware', () => {
  describe('login schema', () => {
    it('should go to next middleware', async () => {
      const body = {
        email: 'test@test.com',
        password: 'test_password',
      }
      const response = await testController(validation(schemas.login), { body });

      expect(response.spies.next).to.have.been.called;
    });

    it('should throw an bad request error', async () => {
      const response = await testController(validation(schemas.login));

      expect(response.error).to.be.instanceof(Boom);
    });
  });

  describe('sale schema', () => {
    it('should go to next middleware', async () => {
      const body = {
        userId: 1,
        sellerId: 2,
        totalPrice: 10.00,
        deliveryAddress: 'Test street',
        deliveryNumber: '198',
        products: [
          {
            id: 1,
            quantity: 3
          },
        ],
      }
      const response = await testController(validation(schemas.sale), { body });

      expect(response.spies.next).to.have.been.called;
    });

    it('should throw an bad request error', async () => {
      const response = await testController(validation(schemas.sale));

      expect(response.error).to.be.instanceof(Boom);
    });
  });

  describe('user schema', () => {
    it('should go to next middleware', async () => {
      const body = {
        name: 'Test mock user',
        email: 'test@test.com',
        password: 'test_password',
      }
      const response = await testController(validation(schemas.user), { body });

      expect(response.spies.next).to.have.been.called;
    });

    it('should throw an bad request error', async () => {
      const response = await testController(validation(schemas.user));

      expect(response.error).to.be.instanceof(Boom);
    });
  });

  describe('user with role schema', () => {
    it('should go to next middleware', async () => {
      const body = {
        role: 'customer',
        name: 'Test mock user',
        email: 'test@test.com',
        password: 'test_password',
      }
      const response = await testController(validation(schemas.userWithRole), { body });

      expect(response.spies.next).to.have.been.called;
    });

    it('should throw an bad request error', async () => {
      const response = await testController(validation(schemas.userWithRole));

      expect(response.error).to.be.instanceof(Boom);
    });
  });
});
