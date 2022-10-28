const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { Boom } = require('@hapi/boom');

const expect = chai.expect
chai.use(chaiAsPromised);

const { User } = require('../../database/models');
const { userService } = require('../../services');
const { userMock } = require('../mocks/userMocks');

describe('User service', () => {
  let findOneStub;

  before(() => {
    findOneStub = sinon.stub(User, 'findOne');
  });

  after(() => {
    findOneStub.restore();
  });

  describe('login', () => {

    describe('Success', () => {
      before(() => findOneStub.resolves(userMock));

      it('should return a token', async () => {
        const userData = {
          email: 'test@test.com',
          password: 'test12345'
        };
    
        await expect(userService.login(userData)).to.eventually.to.be.an('string');
      });
    });

    describe('Failure', () => {
      before(() => findOneStub.resolves(null));

      it('should throw an error', async () => {
        const userData = {
          email: 'test@test.com',
          password: 'test12345'
        };
    
        await expect(userService.login(userData)).to.eventually.to.rejectedWith('User not found');
      });
    });
  });

  describe('create', () => {
    describe('Success', () => {
      before(() => findOneStub.resolves(null));

      it('should return a token', async () => {
        const userData = {
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
        };
    
        await expect(userService.create(userData)).to.eventually.to.be.an('string');
      });
    });

    describe('Failure', () => {
      before(() => findOneStub.resolves(userMock));

      it('should throw an error', async () => {
        const userData = {
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
        };
    
        await expect(userService.create(userData)).to.eventually.to.rejectedWith('Email address is already registered!');
      });
    });
  });
})
