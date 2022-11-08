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

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

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

      localStorage.getItem('appDeliveryTotalPrice', JSON.stringify('0,00'));

  
      await waitFor(
        () => expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });

  describe('Test increase product quantity button', () => {
    it('should not disable "sair" button', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const increaseQtyButton = await screen.findByRole('button', { name: '+' });
  
      expect(increaseQtyButton).not.toBeDisabled();
    });

    it('should increase product quantity', async () => {
      renderWithRouter(<App />, ['/customer/products']);

      const increaseQtyButton = await screen.findByRole('button', { name: '+' });
  
      userEvent.click(increaseQtyButton);

      const productsCart = JSON.parse(localStorage.getItem('appDeliveryCartItems'));
  
      expect(productsCart[0].quantity).toEqual(1);
    });
  });

  describe('Test decrease product quantity button', () => {
    it('should not disable "sair" button', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const increaseQtyButton = await screen.findByRole('button', { name: '-' });
  
      expect(increaseQtyButton).not.toBeDisabled();
    });

    it('should decrease product quantity', async () => {
      const { productInCart } = productsMock
      localStorage.setItem('appDeliveryTotalPrice', JSON.stringify(productInCart[0].subtotal));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productInCart));
  
      renderWithRouter(<App />, ['/customer/products']);

      const increaseQtyButton = await screen.findByRole('button', { name: '-' });
  
      userEvent.click(increaseQtyButton);

      const productsCart = JSON.parse(localStorage.getItem('appDeliveryCartItems'));
  
      expect(productsCart[0].quantity).toEqual(2);
    });
  });

  describe('Test product quantity input', () => {
    beforeEach(() => {
      const { productInCart } = productsMock
      localStorage.setItem('appDeliveryTotalPrice', JSON.stringify(productInCart[0].subtotal));
      localStorage.setItem('appDeliveryCartItems', JSON.stringify(productInCart));
    });

    it('should not disable quantity input', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const qtyInput = await screen.findByTestId('customer_products__input-card-quantity-1');
  
      expect(qtyInput).not.toBeDisabled();
    });

    it('should change product quantity', async () => {
      renderWithRouter(<App />, ['/customer/products']);
      const qtyInputTest = await screen.findByTestId('customer_products__input-card-quantity-1');
      
      userEvent.clear(qtyInputTest);
      userEvent.type(qtyInputTest, '1');

      const productsCart = JSON.parse(localStorage.getItem('appDeliveryCartItems'));

      expect(qtyInputTest).toHaveValue(1);
      expect(productsCart[0].quantity).toEqual(1);
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
