const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect

const { userService } = require('../../services');
const { tokenHelper } = require('../../helpers');
const testController = require('../helpers/testController');
const { userController } = require('../../controllers');
const { userLoginMock, userMock, customerCreateData, customerCreatedMock, userCreateData, sellers, allUsers } = require('../mocks/userMocks');


describe('User controller', () => {
  let loginStub;
  let createStub;
  let getSellersStub;
  let getAllUsersStub;
  let destroyStub;
  let token;

  before(() => {
    loginStub = sinon.stub(userService, 'login');
    createStub = sinon.stub(userService, 'create');
    getSellersStub = sinon.stub(userService, 'getSellers');
    getAllUsersStub = sinon.stub(userService, 'getAllUsers');
    destroyStub = sinon.stub(userService, 'destroy');
    token = tokenHelper.createToken({
      email: 'test@test.com',
      password: 'test_password',
      role: 'customer',
    });
  });

  after(() => {
    loginStub.restore();
    createStub.restore();
    getSellersStub.restore();
    getAllUsersStub.restore();
    destroyStub.restore();
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

  describe('createCostumer', () => {
    before(() => createStub.resolves(customerCreatedMock));

    describe('Success', () => {
  
      it('should return code 200 and a token in the response body', async () => {
        const userData = { ...customerCreateData };
        delete userData.id;
        const response = await testController(userController.createCustomer, { body: userData });
    
        expect(response.status).to.be.equal(201);
        expect(response.body).to.has.key('token');
        expect(response.body.token).to.be.a('string');
      });
    });
  });

  describe('create', () => {
    before(() => createStub.resolves(userMock));

    describe('Success', () => {
  
      it('should return code 200 and the user object in response body', async () => {
        const userData = { ...userCreateData };
        const response = await testController(userController.create, { body: userData });
    
        expect(response.status).to.be.equal(201);
        expect(response.body).to.haveOwnProperty('id', userMock.id);
        expect(response.body).to.haveOwnProperty('name', userMock.name);
        expect(response.body).to.haveOwnProperty('email', userMock.email);
        expect(response.body).to.haveOwnProperty('role', userMock.role);
      });
    });
  });

  describe('getSellers', () => {
    before(() => getSellersStub.resolves(sellers));

    describe('Success', () => {
  
      it('should return code 200 and the user object in response body', async () => {
        const response = await testController(userController.getSellers);
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('array')
        expect(response.body[0]).to.haveOwnProperty('id', sellers[0].id)
        expect(response.body[0]).to.haveOwnProperty('email',  sellers[0].email)
        expect(response.body[0]).to.haveOwnProperty('name',  sellers[0].name)
        expect(response.body[0]).to.haveOwnProperty('role',  sellers[0].role);
      });
    });
  });

  describe('getAllUsers', () => {
    before(() => getAllUsersStub.resolves(allUsers));

    describe('Success', () => {
  
      it('should return code 200 and the user object in response body', async () => {
        const response = await testController(userController.getAllUsers);
    
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an('array')
        expect(response.body[0]).to.haveOwnProperty('id', allUsers[0].id)
        expect(response.body[0]).to.haveOwnProperty('email',  allUsers[0].email)
        expect(response.body[0]).to.haveOwnProperty('name',  allUsers[0].name)
        expect(response.body[0]).to.haveOwnProperty('role',  allUsers[0].role);
      });
    });
  });

  describe('destroy', () => {
    before(() => destroyStub.resolves(1));
    
    describe('Success', () => {
      it('should return code 204 and no response body', async () => {
        const response = await testController(userController.destroy, { params: { id: 1 } });
        expect(response.status).to.be.equal(204);
        expect(response.body).to.be.undefined;
      });
    });

    describe('Failure', () => {
      it('should throw an error when id param is not a number', async () => {
        const result = await testController(userController.destroy, { params: { id: 'teststs' } });

        expect(result.error)
          .to.be.instanceof(Error)
          .and.to.haveOwnProperty('message', 'ID params should be a number');
      });
    });
  });
});
