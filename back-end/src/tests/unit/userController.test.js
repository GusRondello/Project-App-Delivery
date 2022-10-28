const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect

const { userService } = require('../../services');
const { tokenHelper } = require('../../helpers');
const testController = require('../helpers/testController');
const { userController } = require('../../controllers');
const { userLoginMock, userMock } = require('../mocks/userMocks');


describe('User controller', () => {
  let loginStub;
  let createStub;
  let token;

  before(() => {
    loginStub = sinon.stub(userService, 'login');
    createStub = sinon.stub(userService, 'create');
    token = tokenHelper.createToken({
      email: 'test@test.com',
      password: 'test_password',
      role: 'customer',
    });
  });

  after(() => {
    loginStub.restore();
    createStub.restore();
  });

  describe('login', () => {
    before(() => loginStub.resolves(token));

    describe('Success', () => {
  
      it('should return code 200 and a token in the response body', async () => {
        const loginData = { ...userLoginMock };
        const response = await testController(userController.login, { body: loginData });
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.haveOwnProperty('token', token);
      });
    });
  });

  describe('create', () => {
    before(() => createStub.resolves(token));

    describe('Success', () => {
  
      it('should return code 200 and a token in the response body', async () => {
        const userData = { ...userMock };
        delete userData.id;
        const response = await testController(userController.create, { body: userData });
    
        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.haveOwnProperty('token', token);
      });
    });
  });
});
