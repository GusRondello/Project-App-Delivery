import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import renderWithRouter from "./helpers/renderWithRouter";
import App from '../App'
import api from '../services'
import { productsMock, sellersMock, userMock, salesMock } from './mocks'

jest.mock('../services');

describe('Customer Checkout Page', () => {
  beforeEach(() => {
    const { products, productInCart } = productsMock;
    const { sellers } = sellersMock;
    const { saleCreated, customerSale } = salesMock;

    api.getProducts.mockResolvedValue({ products: [products[0]] });
    api.getSellers.mockResolvedValue(sellers);
    api.sendOrder.mockResolvedValue(saleCreated);
    api.getCustomerOrder.mockResolvedValue(customerSale);

    localStorage.setItem('user', JSON.stringify(userMock.userInfos));
    localStorage.setItem('appDeliveryTotalPrice', JSON.stringify('0,00'));
    localStorage.setItem('appDeliveryCartItems', JSON.stringify(productInCart));
  });

  afterEach(() => jest.restoreAllMocks());
  afterAll(() => localStorage.clear());

  describe('Test Customer Checkout renderization', () => {
    it('should render customer products page', () => {
      renderWithRouter(<App/>, ['/customer/checkout']);
    });

    it('should have all elements rendered', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);

      const { name, price, quantity, subtotal } = productsMock.productInCart[0];

      const productsButton = screen.getByRole('button', { name: /produtos/i});
      const myOrdersButton = screen.getByRole('button', { name: /meus pedidos/i});
      const userNameElement = screen.getByText(userMock.userInfos.name)
      const logoutButton = screen.getByRole('button', { name: /Sair/i});
      const checkoutTitle = screen.getByRole('heading', { name: /Finalizar Pedido/i, level: 2 });
      const productItemTitle = screen.getByRole('cell', { name });
      const productItemQty = screen.getByRole('cell', { name: quantity });
      const productItemPrice = screen.getByRole('cell', { name: price.replace('.', ',') });
      const productItemSubTotal = screen.getByRole('cell', { name: subtotal });
      const productItemDeleteBtn = screen.getAllByRole('button', { name: /remover/i });
      const shippingCheckoutTitle = screen.getByRole('heading', { name: /Detalhes e Endereço/i, level: 2 });
      const sellersMenu = screen.getByLabelText('P. Vendedora Responsável:');
      const addressInput = screen.getByLabelText('Endereço:');
      const numberInput = screen.getByLabelText('Número:');
      const checkoutBtn = screen.getByRole('button', { name: /finalizar pedido/i });

  
      expect(productsButton).toBeInTheDocument();
      expect(myOrdersButton).toBeInTheDocument();
      expect(userNameElement).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
      expect(checkoutTitle).toBeInTheDocument();
      expect(productItemTitle).toBeInTheDocument();
      expect(productItemQty).toBeInTheDocument();
      expect(productItemPrice).toBeInTheDocument();
      expect(productItemSubTotal).toBeInTheDocument();
      expect(productItemDeleteBtn[0]).toBeInTheDocument();
      expect(shippingCheckoutTitle).toBeInTheDocument();
      expect(sellersMenu).toBeInTheDocument();
      expect(addressInput).toBeInTheDocument();
      expect(numberInput).toBeInTheDocument();
      expect(checkoutBtn).toBeInTheDocument();
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

  describe('Test "remover" button', () => {
    it('should not disable "meus pedidos" button', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);
      const productItemDeleteBtn = screen.getAllByRole('button', { name: /remover/i });
  
      expect(productItemDeleteBtn[0]).not.toBeDisabled();
    });

    it('should remove product from products list', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);

      const { name } = productsMock.productInCart[0];
      const removeProductButton = screen.getAllByRole('button', { name: /remover/i});
      const productItemTitle = screen.getByRole('cell', { name });

      userEvent.click(removeProductButton[0]);
  
      expect(productItemTitle).not.toBeInTheDocument();
    });
  });

  describe('Test seller select menut', () => {
    it('should change seller menu item', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);

      const { sellers } = sellersMock;
      const sellerOption = await screen.findByRole('option', { name: sellers[1].name });

      userEvent.selectOptions(
        screen.getByRole('combobox'),
        sellerOption,
      )
  
      expect(sellerOption.selected).toBe(true);
    });
  });

  describe('Test checkout button', () => {
    it('should not disable "meus pedidos" button', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);
      const checkoutBtn = screen.getByRole('button', { name: /finalizar pedido/i });
  
      expect(checkoutBtn).not.toBeDisabled();
    });

    it('should remove product from products list', async () => {
      renderWithRouter(<App />, ['/customer/checkout']);

      const checkoutBtn = screen.getByRole('button', { name: /finalizar pedido/i });
      const addressInput = screen.getByLabelText('Endereço:');
      const numberInput = screen.getByLabelText('Número:');

      userEvent.type(addressInput, 'test street');
      userEvent.type(numberInput, '198');
      userEvent.click(checkoutBtn);
  
      await waitFor(
        () => expect(screen.getByRole('heading', { name: /Detalhe do Pedido/i, level: 2 })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });
});
