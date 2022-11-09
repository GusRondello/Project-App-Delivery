const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { customerCreateData, customerCreatedMock } = require('../mocks/userMocks');
const { User } = require('../../database/models');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Register route integration test', () => {
  const BASE_ROUTE = '/register';

  describe('POST - /register', () => {
    describe('Success', () => {
      before(() => {
        sinon
        .stub(User, "findOne")
        .resolves(null);
  
        sinon
        .stub(User, "create")
        .resolves({ ...customerCreatedMock });
      });
  
      after(()=>{
        User.findOne.restore();
        User.create.restore();
      })
  
      it('should return status code 201 and a token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ ...customerCreateData });
  
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body)
          .to.have.property('token')
          .to.be.a('string');
      });
    });
  
    describe('Failure', () => {
      before(() => {
        sinon
        .stub(User, "findOne")
        .resolves({ ...customerCreatedMock });
  
        sinon
        .stub(User, "create")
      });
  
      after(()=>{
        User.findOne.restore();
        User.create.restore();
      })
  
      it('should return status code 400 and an error message, when receive no data', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send();
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"name" is required');
      });
  
      it('should return status code 400 and an error message, when receive no email', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ name: 'Test User Mock', password: 'test123456' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"email" is required');
      });
  
      it('should return status code 400 and an error message, when receive invalid email format', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ email: 'test_test.com', name: 'Test User Mock', password: 'test123456' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"email" must be a valid email');
      });
  
      it('should return status code 400 and an error message, when receive no name', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ email: 'test@test.com', password: 'test123456' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"name" is required');
      });
  
      it('should return status code 400 and an error message, when receive invalid name format', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ email: 'test@test.com', name: 'Test', password: 'test123456' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"name" length must be at least 12 characters long');
      });
  
      it('should return status code 400 and an error message, when receive no password', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ email: 'test@test.com', name: 'Test User Mock' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"password" is required');
      });
  
      it('should return status code 400 and an error message, when receive invalid password format', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ email: 'test@test.com', name: 'Test User Mock', password: 'te' });
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('"password" length must be at least 6 characters long');
      });
  
      it('should return status code 409 and an error message, when user email is already register', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post(BASE_ROUTE)
          .send({ ...customerCreateData });
  
        expect(chaiHttpResponse.status).to.be.equal(409);
        expect(chaiHttpResponse.body)
          .to.have.property('message')
          .to.be.a('string')
          .to.be.equal('Email address is already registered!');
      });
    });
  });
});
