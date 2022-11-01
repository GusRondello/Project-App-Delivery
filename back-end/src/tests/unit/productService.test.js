const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const expect = chai.expect
chai.use(chaiAsPromised);

const { Product } = require('../../database/models');
const { productService } = require('../../services');
const { productsMock } = require('../mocks/productMock');

describe('Product service', () => {
  let findAllStub;

  before(() => {
    findAllStub = sinon.stub(Product, 'findAll');
  });

  after(() => {
    findAllStub.restore();
  });

  describe('getAll', () => {
    describe('Success', () => {
      before(() => findAllStub.resolves(productsMock));

      it('should return a product array', async () => {
        await expect(productService.getAll())
          .to.eventually.to.be.an('array')
          .and.to.be.eql(productsMock);
      });
    });
  });
})
