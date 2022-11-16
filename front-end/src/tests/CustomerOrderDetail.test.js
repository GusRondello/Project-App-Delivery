import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, userMock, salesMock, sellersMock } from './mocks'

jest.mock('../services');

describe('Customer Order Detail Page', () => {
  describe('Test renderization', () => {
    beforeEach(() => {
      const { products, productInCart } = productsMock;
      const { customerSale } = salesMock;
      const { sellers } = sellersMock;
  
      api.getSellers.mockResolvedValue(sellers);
      api.getProducts.mockResolvedValue({ products: [products[0]] });
      api.getCustomerOrder.mockResolvedValue(customerSale);
  
      localStorage.setItem('user', JSON.stringify(userMock.userInfos));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productInCart));
    });
  
    afterEach(() => jest.restoreAllMocks());
  
    describe('Test Customer name renderization', () => {
      it('should render customer name', () => {
        renderWithRouter(<App/>, ['/customer/orders/1']);
  
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
        renderWithRouter(<App />, ['/customer/orders/1']);
        const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
    
        expect(myOrdersButton).not.toBeDisabled();
      });
  
      it('should redirect to customer/orders', async () => {
        renderWithRouter(<App />, ['/customer/orders/1']);
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
        renderWithRouter(<App />, ['/customer/orders/1']);
        const logoutButton = screen.getByRole('button', { name: /sair/i});
    
        expect(logoutButton).not.toBeDisabled();
      });
  
      it('should redirect to /login', async () => {
        renderWithRouter(<App />, ['/customer/orders/1']);
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
        renderWithRouter(<App />, ['/customer/orders/1']);
        const productsButton = screen.getByRole('button', { name: /produtos/i});
    
        expect(productsButton).not.toBeDisabled();
      });
  
      it('should stay in products page when is clicked', async () => {
        renderWithRouter(<App />, ['/customer/orders/1']);
        const productsButton = screen.getByRole('button', { name: /produtos/i});
    
        userEvent.click(productsButton);
    
        await waitFor(
          () => expect(screen.getByRole('button', { name: /produtos/i})).toBeInTheDocument(),
          { timeout: 1000 }
        );
      });
    });
  
    describe('Test order infos', () => {
      it('should have all order detail elements rendered', async () => {
        renderWithRouter(<App />, ['/customer/orders/1']);
  
        const date = new Date(salesMock.customerSales[0].saleDate)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];
  
        await waitFor(() => {
          const orderId = screen.getByText(/PEDIDO 1/i);
          const sellerName = screen.getByText(sellersMock.sellers[0].name);
          const orderDate = screen.getByText(date);
          const orderStatus = screen.getByText(salesMock.customerSales[0].status);
          const orderTotalPrice = screen.getByText(salesMock.customerSales[0].totalPrice.replace('.', ','));
          const markAsDeliveredButton = screen.getByRole('button', { name: /marcar como entregue/i });
  
      
          expect(orderId).toBeInTheDocument();
          expect(sellerName).toBeInTheDocument();
          expect(orderDate).toBeInTheDocument();
          expect(orderStatus).toBeInTheDocument();
          expect(orderTotalPrice).toBeInTheDocument();
          expect(markAsDeliveredButton).toBeInTheDocument();
        })
      });
  
      it('should have order cart itens rendered', async () => {
        renderWithRouter(<App />, ['/customer/orders/1']);
  
        await waitFor(() => {
          const cartItem = screen.getByTestId('customer_order_details__element-order-table-item-number-0');
          const cartItemDescription = screen.getByText(productsMock.productInCart[0].name);
          const cartItemQuantity = screen.getByText(productsMock.productInCart[0].quantity);
          const cartItemPrice = screen.getByText(productsMock.productInCart[0].price.replace('.', ','));
          const cartItemSubTotal = screen.getByText(productsMock.productInCart[0].subtotal.replace('.', ','));
      
          expect(cartItem).toBeInTheDocument();
          expect(cartItemDescription).toBeInTheDocument();
          expect(cartItemQuantity).toBeInTheDocument();
          expect(cartItemPrice).toBeInTheDocument();
          expect(cartItemSubTotal).toBeInTheDocument();
        })
      });
    });
  });

  describe('Test change status order functionality', () => {
    beforeEach(() => {
      const { products, productInCart } = productsMock;
      const { customerSaleInTransit, customerSaleStatusDeliveredUpdated, customerSaleDelivered } = salesMock;
      const { sellers } = sellersMock;
  
      api.getSellers.mockResolvedValue(sellers);
      api.getProducts.mockResolvedValue({ products: [products[0]] });
      api.getCustomerOrder
        .mockResolvedValueOnce(customerSaleInTransit)
        .mockResolvedValue(customerSaleDelivered);
      api.updateOrderStatus.mockResolvedValue(customerSaleStatusDeliveredUpdated)
  
      localStorage.setItem('user', JSON.stringify(userMock.userInfos));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productInCart));
    });
  
    afterEach(() => jest.restoreAllMocks());

    it('should be not disable when an order status is "Em transito"', async () => {
      renderWithRouter(<App/>, ['/customer/orders/1']);

      const changeStatusOrderBtn = await screen.findByRole('button', { name: /marcar como entregue/i });

      expect(changeStatusOrderBtn).not.toBeDisabled();
    });

    it('should be disable when status order change to "Entregue"', async () => {
      renderWithRouter(<App/>, ['/customer/orders/1']);

      const changeStatusOrderBtn = await screen.findByRole('button', { name: /marcar como entregue/i });

      userEvent.click(changeStatusOrderBtn);

      await waitFor(() => {
        const changeStatusOrderBtnDisabled = screen.getByRole('button', { name: /marcar como entregue/i });

        expect(changeStatusOrderBtnDisabled).toBeDisabled();
      });
    });
  });
});
