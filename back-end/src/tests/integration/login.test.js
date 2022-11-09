const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { userLoginMock, userMock } = require('../mocks/userMocks');
const { User } = require('../../database/models');

const expect = chai.expect;
chai.use(chaiHttp);

describe.only('login integration test', () => {
  describe('Success', () => {
    before(() => {
      sinon
      .stub(User, "findOne")
      .resolves({ ...userMock });
    });

    after(()=>{
      User.findOne.restore();
    })

    it('should return status code 200 and a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ ...userLoginMock });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body)
        .to.be.have.property('token')
        .to.be.a('string');
    });
  });

  describe('Failure', () => {
    before(() => {
      sinon
      .stub(User, "findOne")
      .resolves(null);
    });

    after(()=>{
      User.findOne.restore();
    })

    it('should return status code 400 and an error message, when receive no data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send();

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('"email" is required');
    });

    it('should return status code 400 and an error message, when receive no email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ password: 'test123456' });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('"email" is required');
    });

    it('should return status code 400 and an error message, when receive invalid email format', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'test_test.com', password: 'test123456' });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('"email" must be a valid email');
    });

    it('should return status code 400 and an error message, when receive no password', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'test@test.com' });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('"password" is required');
    });

    it('should return status code 400 and an error message, when receive invalid password format', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'te' });

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('"password" length must be at least 6 characters long');
    });

    it('should return status code 404 and an error message, when user is not found', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ ...userLoginMock });

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body)
        .to.be.have.property('message')
        .to.be.a('string')
        .to.be.equal('User not found');
    });
  });
});
