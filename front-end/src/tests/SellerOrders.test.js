import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, userMock, salesMock } from './mocks'

jest.mock('../services');

describe.only('Customer Orders Page', () => {
  beforeEach(() => {
    const { customerSales } = salesMock;
    const { productsSeller } = productsMock;

    api.getAllSellerOrders.mockResolvedValue(customerSales);
    api.getSellerOrder.mockResolvedValue({ products: [productsSeller[0]] });
    api.sendOrderStatusUpdate.mockResolvedValue({});

    localStorage.setItem('user', JSON.stringify(userMock.sellerInfos));
  });

  afterEach(() => jest.restoreAllMocks());

  describe('Test Customer name renderization', () => {
    it('should render seller name', () => {
      renderWithRouter(<App/>, ['/seller/orders']);

      const { name } = userMock.sellerInfos;
      const userNameElement = screen.getByText(name);

      expect(userNameElement).toBeInTheDocument();
    });
  });

  describe('Test "Pedidos" button', () => {
    beforeEach(() => {
      const { customerSales } = salesMock;
  
      api.getAllSellerOrders.mockResolvedValue(customerSales);
    });

    it('should not disable "meus pedidos" button', async () => {
      renderWithRouter(<App />, ['/seller/orders']);
      const ordersButton = screen.getByRole('button', { name: /Pedidos/i});
  
      expect(ordersButton).not.toBeDisabled();
    });

    it('should redirect to seller/orders', async () => {
      renderWithRouter(<App />, ['/seller/orders']);
      const ordersButton = screen.getByRole('button', { name: /Pedidos/i});
  
      userEvent.click(ordersButton);
  
      await waitFor(
        () => expect(screen.getByText(salesMock.customerSales[0].id)).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test "sair" button', () => {
    it('should not disable "sair" button', async () => {
      renderWithRouter(<App />, ['/seller/orders']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      expect(logoutButton).not.toBeDisabled();
    });

    it('should redirect to /login', async () => {
      renderWithRouter(<App />, ['/seller/orders']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      userEvent.click(logoutButton);
  
      await waitFor(
        () => expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test order button', () => {
    it('should have all elements rendered', async () => {
      renderWithRouter(<App />, ['/seller/orders']);

      const date = new Date(salesMock.customerSales[0].saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

      await waitFor(() => {
        const orderId = screen.getByText(salesMock.customerSales[0].id);
        const orderStatus = screen.getByText(salesMock.customerSales[0].status);
        const orderDate = screen.getByText(date);
        const orderPrice = screen.getByText(salesMock.customerSales[0].totalPrice.replace('.', ','));
        const adress = screen.getByTestId('seller_orders__element-card-address-1');

        expect(orderId).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(orderDate).toBeInTheDocument();
        expect(orderPrice).toBeInTheDocument();
        expect(adress).toBeInTheDocument();
      })
    });

    it('should go to details if clicked', async () => {
      renderWithRouter(<App />, ['/seller/orders']);

      await waitFor(() => {
        const orderButton = screen.getByTestId('seller_orders__element-order-id-1');
  
        userEvent.click(orderButton);

        expect(screen.getByText(/Detalhe do pedido/i)).toBeInTheDocument()
      }, { timeout: 1000 })
    });
  });
});
