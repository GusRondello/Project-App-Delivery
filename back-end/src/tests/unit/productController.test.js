const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect

const { productService } = require('../../services');
const { tokenHelper } = require('../../helpers');
const testController = require('../helpers/testController');
const { productController } = require('../../controllers');
const { productsMock } = require('../mocks/productMock');


describe('User controller', () => {
  let getAllStub;
  let token;

  before(() => {
    getAllStub = sinon.stub(productService, 'getAll');
    token = tokenHelper.createToken({
      id: 1,
      email: 'test@test.com',
      password: 'test_password',
      role: 'customer',
    });
  });

  after(() => {
    getAllStub.restore();
  });

  describe('getAll', () => {
    before(() => getAllStub.resolves(productsMock));

    describe('Success', () => {
  
      it('should return code 200 and a token in the response body', async () => {
        const response = await testController(productController.getAll, { });
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.haveOwnProperty('products', productsMock)
      });
    });
  });
});
