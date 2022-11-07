import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, userMock, salesMock, sellersMock } from './mocks'

jest.mock('../services');

describe.only('Customer Orders Page', () => {
  beforeEach(() => {
    const { products } = productsMock;
    const { customerSales } = salesMock;
    const { sellers } = sellersMock;

    api.getAllCustomerOrders.mockResolvedValue(customerSales);
    api.getSellers.mockResolvedValue(sellers);
    api.getProducts.mockResolvedValue({ products: [products[0]] });
    api.getCustomerOrder.mockResolvedValue(customerSales[0]);

    localStorage.setItem('user', JSON.stringify(userMock.userInfos));
  });

  afterEach(() => jest.restoreAllMocks());

  describe('Test Customer name renderization', () => {
    it('should render customer name', () => {
      renderWithRouter(<App/>, ['/customer/orders']);

      const { name } = userMock.userInfos;
      const userNameElement = screen.getByText(name);

      expect(userNameElement).toBeInTheDocument();
    });
  });

  describe('Test "meus pedidos" button', () => {
    beforeEach(() => {
      const { customerSales } = salesMock;
  
      api.getAllCustomerOrders.mockResolvedValue(customerSales);
    });

    it('should not disable "meus pedidos" button', async () => {
      renderWithRouter(<App />, ['/customer/orders']);
      const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
  
      expect(myOrdersButton).not.toBeDisabled();
    });

    it('should redirect to customer/orders', async () => {
      renderWithRouter(<App />, ['/customer/orders']);
      const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
  
      userEvent.click(myOrdersButton);
  
      await waitFor(
        () => expect(screen.getByText(salesMock.customerSales[0].id)).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test "sair" button', () => {
    it('should not disable "sair" button', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      expect(logoutButton).not.toBeDisabled();
    });

    it('should redirect to /login', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      userEvent.click(logoutButton);
  
      await waitFor(
        () => expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test "produtos" button', () => {
    it('should not disable "sair" button', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const productsButton = screen.getByRole('button', { name: /produtos/i});
  
      expect(productsButton).not.toBeDisabled();
    });

    it('should stay in products page when is clicked', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const productsButton = screen.getByRole('button', { name: /produtos/i});
  
      userEvent.click(productsButton);
  
      await waitFor(
        () => expect(screen.getByRole('button', { name: /produtos/i})).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test order button', () => {
    it('should have all elements rendered', async () => {
      renderWithRouter(<App />, ['/customer/orders']);

      await waitFor(() => {
        const orderId = screen.getByTestId('customer_orders__element-order-id-1');
        const orderStatus = screen.getByTestId('customer_orders__element-delivery-status-1');
        const orderDate = screen.getByTestId('customer_orders__element-order-date-1');
        const orderPrice = screen.getByTestId('customer_orders__element-card-price-1');

    
        expect(orderId).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(orderDate).toBeInTheDocument();
        expect(orderPrice).toBeInTheDocument();
      })
    });

    it('should go to details if clicked', async () => {
      renderWithRouter(<App />, ['/customer/orders']);

      await waitFor(() => {
        const orderButton = screen.getByTestId('customer_orders__element-order-id-1');
  
        userEvent.click(orderButton);

        expect(screen.getByText(/Detalhe do pedido/i)).toBeInTheDocument()
      }, { timeout: 1000 })
    });
  });
});
