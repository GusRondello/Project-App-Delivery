const RESPONSE = {
  data: {},
  status: undefined,
  statusText: undefined,
};

export default class AxiosError extends Error {
  constructor(response = RESPONSE) {
    super(`'Request failed with status code ${response.status}'`);

    this.name = 'AxiosError';
    this.response = response;
  }
}

export const responseBuilder = (message, statusCode, error) => ({
  data: {
    error,
    message,
    statusCode,
  },
  status: statusCode,
  statusText: error,
});
