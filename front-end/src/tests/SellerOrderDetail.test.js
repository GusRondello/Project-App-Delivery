import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, userMock, salesMock } from './mocks'

jest.mock('../services');

describe('Seller Orders Details Page', () => {
  beforeEach(() => {
    const { customerSale } = salesMock;
    const { productsSeller } = productsMock;

    // api.getAllSellerOrders.mockResolvedValue(customerSale);
    // na primeira chamada de getSellerOrder, retorna o mock customerSale
    api.getSellerOrder.mockResolvedValue(customerSale);
    // na segunda chamada de getSellerOrder, retorna o mock productsSeller
    // api.getSellerOrder.mockResolvedValue({ products: [productsSeller[0]] });
    api.sendOrderStatusUpdate.mockResolvedValue({});

    localStorage.setItem('user', JSON.stringify(userMock.sellerInfos));
  });

  afterEach(() => jest.restoreAllMocks());

  describe('Test Seller name renderization', () => {
    it('should render customer name', () => {
      renderWithRouter(<App/>, ['/seller/orders/1']);

      const { name } = userMock.userInfos;
      const userNameElement = screen.getByText(name);

      expect(userNameElement).toBeInTheDocument();
    });
  });

  describe('Test "Pedidos" button', () => {
    beforeEach(() => {
      const { customerSales } = salesMock;
  
      api.getAllSellerOrders.mockResolvedValue(customerSales);
    });

    it('should not disable "Pedidos" button', async () => {
      renderWithRouter(<App />, ['/seller/orders/1']);
      const ordersButton = screen.getByRole('button', { name: /Pedidos/i});
  
      expect(ordersButton).not.toBeDisabled();
    });

    it('should redirect to seller/orders', async () => {
      renderWithRouter(<App />, ['/seller/orders/1']);
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
      renderWithRouter(<App />, ['/seller/orders/1']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      expect(logoutButton).not.toBeDisabled();
    });

    it('should redirect to /login', async () => {
      renderWithRouter(<App />, ['/seller/orders/1']);
      const logoutButton = screen.getByRole('button', { name: /sair/i});
  
      userEvent.click(logoutButton);
  
      await waitFor(
        () => expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test order infos', () => {
    it('should have all order detail elements rendered', async () => {
      renderWithRouter(<App />, ['/seller/orders/1']);

      const date = new Date(salesMock.customerSale.saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

      await waitFor(() => {
        const orderId = screen.getByText(/PEDIDO 1/i);
        const orderDate = screen.getByText(date);
        const orderStatus = screen.getByText(salesMock.customerSale.status);
        const orderTotalPrice = screen.getByText(salesMock.customerSale.totalPrice.replace('.', ','));
        const prepareOrder = screen.getByRole('button', { name: /preparar pedido/i });
        const goingToDelivery = screen.getByRole('button', { name: /saiu para entrega/i });

    
        expect(orderId).toBeInTheDocument();
        expect(orderDate).toBeInTheDocument();
        expect(orderStatus).toBeInTheDocument();
        expect(orderTotalPrice).toBeInTheDocument();
        expect(prepareOrder).toBeInTheDocument();
        expect(goingToDelivery).toBeInTheDocument();
      })
    });

    it('should have order cart itens rendered', async () => {
      renderWithRouter(<App />, ['/seller/orders/1']);
      const { products } = salesMock.customerSale;
      const subTotal = (products[0].product.quantity * products[0].price);

      await waitFor(() => {
        const cartItem = screen.getByTestId('seller_order_details__element-order-table-item-number-0');
        const cartItemDescription = screen.getByText(products[0].name);
        const cartItemQuantity = screen.getByText(products[0].product.quantity);
        const cartItemPrice = screen.getByText(products[0].price.replace('.', ','));
        const cartItemSubTotal = screen.getByText(subTotal.toFixed(2).replace('.', ','));
    
        expect(cartItem).toBeInTheDocument();
        expect(cartItemDescription).toBeInTheDocument();
        expect(cartItemQuantity).toBeInTheDocument();
        expect(cartItemPrice).toBeInTheDocument();
        expect(cartItemSubTotal).toBeInTheDocument();
      })
    });
  });
});
