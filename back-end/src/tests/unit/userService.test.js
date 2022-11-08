const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const expect = chai.expect
chai.use(chaiAsPromised);

const { User } = require('../../database/models');
const { userService } = require('../../services');
const { userMock, sellers, allUsers, admin } = require('../mocks/userMocks');

describe('User service', () => {
  let findOneStub;
  let findAllStub;
  let createStub;
  let destroyStub;

  before(() => {
    findOneStub = sinon.stub(User, 'findOne');
    findAllStub = sinon.stub(User, 'findAll');
    createStub = sinon.stub(User, 'create');
    destroyStub = sinon.stub(User, 'destroy');
  });

  after(() => {
    findOneStub.restore();
    findAllStub.restore();
    createStub.restore();
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
      before(() => {
        findOneStub.resolves(null);
        createStub.resolves(userMock);
      });

      it('should return user created', async () => {
        const userData = {
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
          role: 'customer',
        };

        const sut = await userService.create(userData)

        expect(sut).to.haveOwnProperty('id', userMock.id)
        expect(sut).to.haveOwnProperty('email', userMock.email)
        expect(sut).to.haveOwnProperty('password', userMock.password)
        expect(sut).to.haveOwnProperty('role', userMock.role);
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

  describe('getSellers', () => {
    describe('Success', () => {
      before(() => {
        findAllStub.resolves(sellers);
      });

      it('should return array of sellers', async () => {
        const sut = await userService.getSellers()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.haveOwnProperty('id', sellers[0].id)
        expect(sut[0]).to.haveOwnProperty('email',  sellers[0].email)
        expect(sut[0]).to.haveOwnProperty('name',  sellers[0].name)
        expect(sut[0]).to.haveOwnProperty('role',  sellers[0].role);
      });
    });
  });

  describe('getAllUsers', () => {
    describe('Success', () => {
      before(() => {
        findAllStub.resolves(allUsers);
      });

      it('should return an array of all users', async () => {
        const sut = await userService.getAllUsers()

        expect(sut).to.be.an('array')
        expect(sut[0]).to.haveOwnProperty('id', allUsers[0].id)
        expect(sut[0]).to.haveOwnProperty('email',  allUsers[0].email)
        expect(sut[0]).to.haveOwnProperty('name',  allUsers[0].name)
        expect(sut[0]).to.haveOwnProperty('role',  allUsers[0].role);
      });
    });
  });

  describe('destroy', () => {
    describe('Success', () => {
      before(() => {
        findOneStub.resolves(null);
        destroyStub.resolves(1);
      });

      it('should return void', async () => {
        await userService.destroy(1);
      });
    });

    describe('Failure', () => {
      it('should throw an error, when user to be deleted is an administrator', async () => {
        findOneStub.resolves(admin);

        await expect(userService.destroy()).to.eventually.to.rejectedWith('User is an administrator');
      });

      it('should throw an error', async () => {
        findOneStub.resolves(null);
        destroyStub.resolves(0);

        await expect(userService.destroy()).to.eventually.to.rejectedWith('User not found');
      });
    });
  });
})
