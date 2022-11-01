const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const expect = chai.expect
chai.use(chaiAsPromised);

const { Sale, SaleProduct } = require('../../database/models');
const { saleService } = require('../../services');
const { saleMock, salesUserMock, createSaleDataMock } = require('../mocks/saleMock');

describe('Sale service', () => {
  let findAllStub;
  let findByPkStub;
  let createStub;

  before(() => {
    findAllStub = sinon.stub(Sale, 'findAll');
    findByPkStub = sinon.stub(Sale, 'findByPk');
    createStub = sinon.stub(Sale, 'create');

    sinon.stub(SaleProduct, 'bulkCreate');
  });

  after(() => {
    findAllStub.restore();
    findByPkStub.restore();
    createStub.restore();

    SaleProduct.bulkCreate.restore();
  });

  describe('create', () => {
    describe('Success', () => {
      before(() => createStub.resolves(saleMock));

      it('should return a sale object', async () => {
        const saleData = { ...createSaleDataMock }
        const sut = await saleService.create(saleData);

        expect(sut).to.be.an('object');
        expect(sut).to.haveOwnProperty('id', saleMock.id);
        expect(sut).to.haveOwnProperty('userId', saleMock.userId);
        expect(sut).to.haveOwnProperty('sellerId', saleMock.sellerId);
        expect(sut).to.haveOwnProperty('totalPrice', saleMock.totalPrice);
        expect(sut).to.haveOwnProperty('deliveryAddress', saleMock.deliveryAddress);
        expect(sut).to.haveOwnProperty('deliveryNumber', saleMock.deliveryNumber);
        expect(sut).to.haveOwnProperty('saleDate', saleMock.saleDate);
        expect(sut).to.haveOwnProperty('status', saleMock.status);
      });
    });
  });

  describe('getUserOrders', () => {
    describe('Success', () => {
      before(() => findAllStub.resolves(salesUserMock));

      it('should return an user sales array', async () => {
        const sut = await saleService.getUserOrders(3);

        expect(sut).to.be.an('array');
        expect(sut[0]).to.haveOwnProperty('userId', 3);
      });
    });
  });

  describe('getOrderById', () => {
    describe('Success', () => {
      before(() => findByPkStub.resolves(salesUserMock[1]));

      it('should return one user sale object', async () => {
        await expect(saleService.getOrderById(2))
          .to.eventually.to.be.an('object')
          .and.to.be.eql(salesUserMock[1]);
      });
    });

    describe('Failure', () => {
      before(() => findByPkStub.resolves(null));

      it('should return one user sale object', async () => {
        await expect(saleService.getOrderById(90))
          .to.eventually.to.rejectedWith('Order not found')
      });
    });
  });
})
