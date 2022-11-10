import services from '../services';
import api from '../services/baseUrl';
import AxiosError, { responseBuilder } from './helpers/axiosError';
import { salesMock, userMock } from './mocks'

jest.mock('../services/baseUrl');

describe('Test services APIs', () => {
  const token = userMock.TOKEN;

  describe('adminApi', () => {
    afterEach(() => jest.clearAllMocks());

    describe('registerAsAdmin', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.post.mockResolvedValue({ data: userMock.userRegisterByAdmin });
        });
  
        it('should return the user created by admin', async () => {
          const { userRegisterByAdmin } = userMock
          const sut = await services.registerAsAdmin({
            name: 'Xablau Silva',
            email: 'xablau@email.com',
            password: 'xablau_password',
            role: 'seller',
          }, token);
  
          expect(sut).toHaveProperty('id', userRegisterByAdmin.id);
          expect(sut).toHaveProperty('name', userRegisterByAdmin.name);
          expect(sut).toHaveProperty('email', userRegisterByAdmin.email);
          expect(sut).toHaveProperty('role', userRegisterByAdmin.role);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('"name" is required', 400, 'Bad Request');

        it('should return an axios error when request failed', async () => {
          api.post.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.registerAsAdmin({
            email: 'xablau@email.com',
            password: 'xablau_password',
            role: 'seller',
          }, token);
  
          expect(sut).toHaveProperty('error', 'Bad Request');
          expect(sut).toHaveProperty('message', '"name" is required');
          expect(sut).toHaveProperty('statusCode', 400);
        });

        it('should return an error when unexpected  error happen', async () => {
          api.post.mockRejectedValueOnce(new Error('Unexpected Error'));

          const sut = await services.registerAsAdmin({
            name: 'Xablau Silva',
            email: 'xablau@email.com',
            password: 'xablau_password',
            role: 'seller',
          }, token);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('getUsers', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.get.mockResolvedValueOnce({ data: userMock.allUsers })
        });

        it('should return all users', async () => {
          const sut = await services.getUsers(token);
  
          expect(sut).toEqual(expect.arrayContaining(userMock.allUsers));
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('User unauthorized', 401, 'Unauthorized');

        it('should return an axios error when request failed', async () => {
          api.get.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.getUsers(token);
  
          expect(sut).toHaveProperty('error', 'Unauthorized');
          expect(sut).toHaveProperty('message', 'User unauthorized');
          expect(sut).toHaveProperty('statusCode', 401);
        });

        it('should return an error when unexpected  error happen', async () => {
          api.post.mockRejectedValueOnce(new Error('Unexpected Error'));

          const sut = await services.getUsers(token);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('excludeUser', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.delete.mockResolvedValue();
        });
  
        it('should return void', async () => {
          const sut = await services.excludeUser(token, 1);
  
          expect(sut).toEqual(undefined);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('User is an administrator', 409, 'Conflict');

        it('should return an axios error when request failed', async () => {
          api.delete.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.excludeUser(token, 1);
  
          expect(sut).toHaveProperty('error', 'Conflict');
          expect(sut).toHaveProperty('message', 'User is an administrator');
          expect(sut).toHaveProperty('statusCode', 409);
        });

        it('should return an error when unexpected error happen', async () => {
          api.delete.mockRejectedValueOnce(new Error('Unexpected Error'));

          const sut = await services.excludeUser(token, 1);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });
  });

  describe('commonApi', () => {
    afterEach(() => jest.clearAllMocks());

    describe('singIn', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.post.mockResolvedValue({ data: { token } });
        });
  
        it('should return an user object with token', async () => {
          const { email, password } = userMock.userlogin;
          const sut = await services.singIn(email, password);

          expect(sut).toHaveProperty('token', token);
          expect(sut).toHaveProperty('role', 'customer');
          expect(sut).toHaveProperty('name', 'Cliente Zé Birita');
          expect(sut).toHaveProperty('email', 'zebirita@email.com');
          expect(sut).toHaveProperty('id', 3);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('User not found', 404, 'Not Found');

        it('should return an axios error when request failed', async () => {
          api.post.mockRejectedValueOnce(new AxiosError(response));

          const { email, password } = userMock.userlogin;
          const sut = await services.singIn(email, password);
  
          expect(sut).toHaveProperty('error', 'Not Found');
          expect(sut).toHaveProperty('message', 'User not found');
          expect(sut).toHaveProperty('statusCode', 404);
        });

        it('should return an error when unexpected error happen', async () => {
          api.post.mockRejectedValueOnce(new Error('Unexpected Error'));
          const { email, password } = userMock.userlogin;

          const sut = await services.singIn(email, password);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });
  });

  describe('sellerApi', () => {
    afterEach(() => jest.clearAllMocks());

    describe('getSellerOrder', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.get.mockResolvedValue({ data: salesMock.customerSale });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.getSellerOrder(token, 1);

          expect(sut).toHaveProperty('id', 1);
          expect(sut).toHaveProperty('userId', 3);
          expect(sut).toHaveProperty('sellerId', 2);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('Order not found', 404, 'Not Found');

        it('should return an axios error when request failed', async () => {
          api.get.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.getSellerOrder(token, 1);
  
          expect(sut).toHaveProperty('error', 'Not Found');
          expect(sut).toHaveProperty('message', 'Order not found');
          expect(sut).toHaveProperty('statusCode', 404);
        });

        it('should return an error when unexpected error happen', async () => {
          api.get.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.getSellerOrder(token, 1);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('getAllSellerOrders', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.get.mockResolvedValue({ data: salesMock.customerSales });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.getAllSellerOrders(token);

          expect(sut).toEqual(expect.arrayContaining(salesMock.customerSales));
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('User unauthorized', 401, 'Unauthorized');

        it('should return an axios error when request failed', async () => {
          api.get.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.getAllSellerOrders(token);
  
          expect(sut).toHaveProperty('error', 'Unauthorized');
          expect(sut).toHaveProperty('message', 'User unauthorized');
          expect(sut).toHaveProperty('statusCode', 401);
        });

        it('should return an error when unexpected error happen', async () => {
          api.get.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.getAllSellerOrders(token);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('sendOrderStatusUpdate', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.patch.mockResolvedValue({ data: salesMock.customerSalePreparing });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.sendOrderStatusUpdate(token, { status: 'Preparando' }, 1);

          expect(sut).toEqual(expect.objectContaining(salesMock.customerSalePreparing));
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('Order not found', 404, 'Not Found');

        it('should return an axios error when request failed', async () => {
          api.patch.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.sendOrderStatusUpdate(token, { status: 'Preparando' }, 1);
  
          expect(sut).toHaveProperty('error', 'Not Found');
          expect(sut).toHaveProperty('message', 'Order not found');
          expect(sut).toHaveProperty('statusCode', 404);
        });

        it('should return an error when unexpected error happen', async () => {
          api.patch.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.sendOrderStatusUpdate(token, { status: 'Preparando' }, 1);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });
  });

  describe('customerApi', () => {
    afterEach(() => jest.clearAllMocks());

    describe('register', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.post.mockResolvedValue({ data: { token: userMock.CUSTOMER_TOKEN } });
        });
  
        it('should return an user object with token', async () => {
          const { costumerCreatedInfos } = userMock;
          const sut = await services.register('Test user mock', 'test@test.com', 'test_password');
          
          
          expect(sut).toHaveProperty('token', costumerCreatedInfos.token);
          expect(sut).toHaveProperty('name', costumerCreatedInfos.name);
          expect(sut).toHaveProperty('email', costumerCreatedInfos.email);
          expect(sut).toHaveProperty('role', costumerCreatedInfos.role);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('"name" is required', 400, 'Bad Request');

        it('should return an axios error when request failed', async () => {
          api.post.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.register({
            email: 'test@test.com',
            password: 'test_password',
          }, token);
  
          expect(sut).toHaveProperty('error', 'Bad Request');
          expect(sut).toHaveProperty('message', '"name" is required');
          expect(sut).toHaveProperty('statusCode', 400);
        });

        it('should return an error when unexpected  error happen', async () => {
          api.post.mockRejectedValueOnce(new Error('Unexpected Error'));

          const sut = await services.register({
            name: 'Test user mock',
            email: 'test@test.com',
            password: 'test_password',
          }, token);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('getCustomerOrder', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.get.mockResolvedValue({ data: salesMock.customerSale });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.getCustomerOrder(token, 1);

          expect(sut).toHaveProperty('id', 1);
          expect(sut).toHaveProperty('userId', 3);
          expect(sut).toHaveProperty('sellerId', 2);
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('Order not found', 404, 'Not Found');

        it('should return an axios error when request failed', async () => {
          api.get.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.getCustomerOrder(token, 1);
  
          expect(sut).toHaveProperty('error', 'Not Found');
          expect(sut).toHaveProperty('message', 'Order not found');
          expect(sut).toHaveProperty('statusCode', 404);
        });

        it('should return an error when unexpected error happen', async () => {
          api.get.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.getCustomerOrder(token, 1);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('getAllCustomerOrders', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.get.mockResolvedValue({ data: salesMock.customerSales });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.getAllCustomerOrders(token);

          expect(sut).toEqual(expect.arrayContaining(salesMock.customerSales));
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('User unauthorized', 401, 'Unauthorized');

        it('should return an axios error when request failed', async () => {
          api.get.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.getAllCustomerOrders(token);
  
          expect(sut).toHaveProperty('error', 'Unauthorized');
          expect(sut).toHaveProperty('message', 'User unauthorized');
          expect(sut).toHaveProperty('statusCode', 401);
        });

        it('should return an error when unexpected error happen', async () => {
          api.get.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.getAllCustomerOrders(token);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });

    describe('updateOrderStatus', () => {
      describe('Success', () => {
        beforeEach(() => {
          api.patch.mockResolvedValue({ data: salesMock.customerSalePreparing });
        });
  
        it('should return an user object with token', async () => {
          const sut = await services.updateOrderStatus(token, { status: 'Preparando' }, 1);

          expect(sut).toEqual(expect.objectContaining(salesMock.customerSalePreparing));
        });
      });

      describe('Failure', () => {
        const response = responseBuilder('Order not found', 404, 'Not Found');

        it('should return an axios error when request failed', async () => {
          api.patch.mockRejectedValueOnce(new AxiosError(response));

          const sut = await services.updateOrderStatus(token, { status: 'Preparando' }, 1);
  
          expect(sut).toHaveProperty('error', 'Not Found');
          expect(sut).toHaveProperty('message', 'Order not found');
          expect(sut).toHaveProperty('statusCode', 404);
        });

        it('should return an error when unexpected error happen', async () => {
          api.patch.mockRejectedValueOnce(new Error('Unexpected Error'));
          
          const sut = await services.updateOrderStatus(token, { status: 'Preparando' }, 1);
  
          expect(sut).toHaveProperty('error');
        });
      });
    });
  });
});
