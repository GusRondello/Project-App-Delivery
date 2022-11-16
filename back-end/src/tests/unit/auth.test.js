const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')
const { Boom } = require('@hapi/boom');

const expect = chai.expect
chai.use(sinonChai);

const testController = require('../helpers/testController');
const { auth } = require('../../middlewares');
const { tokenHelper } = require('../../helpers');

describe('Auth middleware', () => {
  describe('When did not receive a token', () => {
    it('should throw an bad request error', async () => {
      const response = await testController(auth('user'));

      expect(response.error).to.be.instanceof(Boom);
      expect(response.error.message).to.be.equal('Token not found');
    });
  });

  describe('When receive an invalid token', () => {
    it('should throw an jwt error', async () => {
      const authorization = '(NB&*(^ invalid_token*&^N80 76 B&'
      const response = await testController(auth('user'), { headers: { authorization } });

      expect(response.error).to.be.instanceof(Boom);
      expect(response.error.message).to.be.equal('Expired or invalid token');
    });
  });

  describe('When receive an expired token', () => {
    it('should throw an jwt error', async () => {
      const authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlRlc3QgdXNlciBtb2NrIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjY3NTIwMDY3LCJleHAiOjE2Njc2MDY0Njd9.XJZZVi3A5JcVXH_2qXhqJqXnqdDJLVmcaAmmb61aLWE';
      const response = await testController(auth('user'), { headers: { authorization } });

      expect(response.error).to.be.instanceof(Boom);
      expect(response.error.message).to.be.equal('Expired or invalid token');
    });
  });

  describe('When receive an unauthorized token', () => {
    it('should throw an unauthorized error', async () => {
      const userData = {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        role: 'customer',
      }
      const authorization = tokenHelper.createToken(userData);
      const response = await testController(auth('seller'), { headers: { authorization } });

      expect(response.error).to.be.instanceof(Boom);
      expect(response.error.message).to.be.equal('User unauthorized');
    });
  });

  describe('When everything is right', () => {
    it('should go to next middleware', async () => {
      const userData = {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        role: 'customer',
      }
      const authorization = tokenHelper.createToken(userData);
      const response = await testController(auth('customer'), { headers: { authorization } });

      expect(response.spies.next).to.have.been.called;
    });
  });
});
