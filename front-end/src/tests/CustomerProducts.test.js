import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, sellersMock, userMock, salesMock } from './mocks'

jest.mock('../services');

describe('Customer Products Page', () => {
  beforeEach(() => {
    const { products } = productsMock;
    const { sellers } = sellersMock;

    api.getProducts.mockResolvedValue({ products: [products[0]] });
    api.getSellers.mockResolvedValue(sellers);

    localStorage.setItem('user', JSON.stringify(userMock.userInfos));
    localStorage.setItem('appDeliveryTotalPrice', JSON.stringify('0,00'));
    localStorage.setItem('appDeliveryCartItems', JSON.stringify([]));
  });

  afterEach(() => jest.restoreAllMocks());
  afterAll(() => localStorage.clear());

  describe('Test Customer Products renderization', () => {
    it('should render customer products page', () => {
      renderWithRouter(<App/>, ['/customer/products']);
    });

    it('should have all elements rendered', async () => {
      renderWithRouter(<App />, ['/customer/products']);

      const { name, price } = productsMock.products[0]
      const productsButton = screen.getByRole('button', { name: /produtos/i});
      const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
      const userNameElement = screen.getByText(userMock.userInfos.name)
      const logoutButton = screen.getByRole('button', { name: /Sair/i});

  
      expect(productsButton).toBeInTheDocument();
      expect(myOrdersButton).toBeInTheDocument();
      expect(userNameElement).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();

      await waitFor(() => {
        const productTitle = screen.getByText(name);
        const productImage = screen.getByAltText(name);
        const productPrice = screen.getByText(price.toString().replace('.', ','));
        const decreaseQtyButton = screen.getByRole('button', { name: '-' });
        const increaseQtyButton = screen.getByRole('button', { name: '+' });
        const QtyInput = screen.getByDisplayValue(0);
        
        expect(productTitle).toBeInTheDocument();
        expect(productImage).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
        expect(decreaseQtyButton).toBeInTheDocument();
        expect(increaseQtyButton).toBeInTheDocument();
        expect(QtyInput).toBeInTheDocument();
      })
    });
  });

  describe('Test "meus pedidos" button', () => {
    beforeEach(() => {
      const { customerSales } = salesMock;
  
      api.getAllCustomerOrders.mockResolvedValue(customerSales);
    });

    it('should not disable "meus pedidos" button', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
  
      expect(myOrdersButton).not.toBeDisabled();
    });

    it('should redirect to customer/orders', async () => {
      renderWithRouter(<App />, ['/customer/products']);
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

  describe('Test checkout button', () => {
    it('should be disabled when there are no products in cart', async () => {
      localStorage.setItem('appDeliveryCartItems', JSON.stringify([]));

      renderWithRouter(<App />, ['/customer/products']);
      const checkoutButton = screen.getByTestId('customer_products__button-cart');
  
      expect(checkoutButton).toBeDisabled();
    });

    it('should be not disabled when there are products in cart', async () => {
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productsMock.productInCart));

      renderWithRouter(<App />, ['/customer/products']);
      const checkoutButton = screen.getByTestId('customer_products__button-cart');
  
      expect(checkoutButton).not.toBeDisabled();
    });

    it('should redirect to checkout page when is clicked', async () => {
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productsMock.productInCart));

      renderWithRouter(<App />, ['/customer/products']);
      const checkoutButton = screen.getByTestId('customer_products__button-cart');
  
      userEvent.click(checkoutButton);
  
      await waitFor(
        () => expect(screen.getByRole('heading', { name: /Finalizar Pedido/i, level: 2 })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });
});
