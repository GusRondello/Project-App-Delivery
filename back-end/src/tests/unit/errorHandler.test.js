const boom = require('@hapi/boom');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect

const { errorHandler } = require('../../middlewares');
const testController = require('../helpers/testController');


describe('Error handler middleware', () => {
  describe('Whe receive a boom error instance', () => {
    it('should return hapi/boom error status code and its payload in the req body', async () => {
      const response = await testController(errorHandler, {}, boom.notFound('Not found'));

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.haveOwnProperty('statusCode', 404);
      expect(response.body).to.be.haveOwnProperty('error', 'Not Found');
      expect(response.body).to.be.haveOwnProperty('message', 'Not found');
    });
  });

  describe('Whe receive an unexpected error', () => {
    it('should return status code 500 and in the req body the error message and its name', async () => {
      const response = await testController(errorHandler, {}, new Error('Unexpected error'));

      expect(response.status).to.be.equal(500);
      expect(response.body).to.be.haveOwnProperty('error', 'Error');
      expect(response.body).to.be.haveOwnProperty('message', 'Unexpected error');
    });
  });
});
