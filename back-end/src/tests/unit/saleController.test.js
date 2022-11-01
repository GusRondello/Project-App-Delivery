const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
chai.use(chaiAsPromised);

const { saleService } = require('../../services');
const { tokenHelper } = require('../../helpers');
const testController = require('../helpers/testController');
const { saleController } = require('../../controllers');
const { saleMock, createSaleDataMock, salesUserMock } = require('../mocks/saleMock');


describe('Sale controller', () => {
  let createStub;
  let getUserOrdersStub;
  let getOrderByIdStub;
  let token;

  before(() => {
    createStub = sinon.stub(saleService, 'create');
    getUserOrdersStub = sinon.stub(saleService, 'getUserOrders');
    getOrderByIdStub = sinon.stub(saleService, 'getOrderById');

    token = tokenHelper.createToken({
      id: 1,
      email: 'test@test.com',
      password: 'test_password',
      role: 'customer',
    });
  });

  after(() => {
    createStub.restore();
    getUserOrdersStub.restore();
    getOrderByIdStub.restore();
  });

  describe('create', () => {
    before(() => createStub.resolves(saleMock));

    describe('Success', () => {
  
      it('should return code 201 and an object in the response body', async () => {
        const response = await testController(saleController.create, { body: createSaleDataMock });
    
        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.haveOwnProperty('id', saleMock.id);
        expect(response.body).to.haveOwnProperty('userId', saleMock.userId);
        expect(response.body).to.haveOwnProperty('sellerId', saleMock.sellerId);
        expect(response.body).to.haveOwnProperty('totalPrice', saleMock.totalPrice);
        expect(response.body).to.haveOwnProperty('deliveryAddress', saleMock.deliveryAddress);
        expect(response.body).to.haveOwnProperty('deliveryNumber', saleMock.deliveryNumber);
        expect(response.body).to.haveOwnProperty('saleDate', saleMock.saleDate);
        expect(response.body).to.haveOwnProperty('status', saleMock.status);
      });
    });
  });

  describe('getUserOrders', () => {
    before(() => getUserOrdersStub.resolves(salesUserMock));

    describe('Success', () => {
      it('should return code 200 and an array in the response body', async () => {
        const user = {
          id: 1,
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          role: 'customer'
        }
        const response = await testController(saleController.getUserOrders, {}, null, { user });
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body[0]).to.haveOwnProperty('userId', 3);
      });
    });

    describe('Failure', () => {
      it('should return an error', async () => {
        const result = await testController(saleController.getUserOrders, {}, null, {});

        expect(result.error)
          .to.be.instanceof(Error)
          .and.to.haveOwnProperty('message', 'Response locals user variable was not defined');

      });
    });
  });

  describe('getOrderById', () => {
    before(() => getOrderByIdStub.resolves(salesUserMock[0]));

    describe('Success', () => {
  
      it('should return code 200 and a object in the response body', async () => {
        const response = await testController(saleController.getOrderById, { params: { id: 1 } });
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.be.eql(salesUserMock[0]);
      });
    });
  });
});
