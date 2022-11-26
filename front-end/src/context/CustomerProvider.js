import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CustomerContext from './CustomerContext';
import api from '../services';
import saveCartItems from '../helpers/saveCartItems';
import getCartItems from '../helpers/getCartItems';
import saveTotalPrice from '../helpers/saveTotalPrice';
import getUserInfo from '../helpers/getUserInfo';

function CustomerProvider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems() || []);
  const [sellers, setSellers] = useState([]);

  const navigate = useNavigate();

  /* Função responsável por pegar da API (api.getSellers) os vendedores */
  useEffect(() => {
    async function fetchSellers() {
      const { token } = getUserInfo();

      const data = await api.getSellers(token);

      setSellers(data);
    }
    fetchSellers();
  }, []);

  /* Função responsável por comparar os produtos recebidos da API com os produtos do carrinho
     e manter a quantidade de itens do mesmo caso já existir o produto lá */
  const combineWithLocalStorageQtd = (productsWithQtd) => {
    const products = getCartItems();

    if (products?.length > 0) {
      const productsArrayUpdated = productsWithQtd.map((product) => {
        const { id } = product;
        const productInCart = products.find((prod) => prod.id === id);

        if (productInCart) {
          return { ...product, quantity: productInCart.quantity };
        }
        return product;
      });

      setProductsArray(productsArrayUpdated);
    } else {
      setProductsArray(productsWithQtd);
    }
  };

  /* Função responsável por pegar da API (api.getProducts) os produtos */
  useEffect(() => {
    async function fetchProducts() {
      const { token } = getUserInfo();
      const { error, products } = await api.getProducts(token);

      /* Caso não haja erro, desloga o usuário e envia para a tela de login */
      if (error === true) {
        localStorage.removeItem('user');
        return navigate('/login');
      }

      const productsWithQtd = products.map((product) => ({ ...product, quantity: 0 }));

      const productsWithQtdAndPrice = productsWithQtd.map((product) => {
        const { price } = product;
        const priceString = price.toString();

        return { ...product, price: priceString };
      });
      combineWithLocalStorageQtd(productsWithQtdAndPrice);
    }
    fetchProducts();
  }, []);

  /* Função responsável por atualizar o carrinho toda vez que a quantidade de um item for alterada */
  useEffect(() => {
    if (isCartUpdated) {
      const cart = productsArray.map((product) => {
        const { urlImage, ...rest } = product;
        return rest;
      }).filter((product) => product.quantity > 0);

      const cartWithSubtotal = cart.map((product) => {
        const { price, quantity } = product;
        const subtotal = (price * quantity).toFixed(2).replace('.', ',');
        return { ...product, subtotal };
      });

      const totalPriceCart = cartWithSubtotal.reduce((acc, product) => {
        const { price, quantity } = product;
        return acc + (price * quantity);
      }, 0).toFixed(2).replace('.', ',');

      saveCartItems(cartWithSubtotal);
      setCartItems(cartWithSubtotal);
      saveTotalPrice(totalPriceCart);
      setIsCartUpdated(false);
    }
  }, [productsArray, isCartUpdated]);

  const contextValue = useMemo(() => ({
    productsArray,
    setProductsArray,
    setIsCartUpdated,
    cartItems,
    sellers,
  }), [productsArray, isCartUpdated]);

  CustomerProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <CustomerContext.Provider value={ contextValue }>
      {children}
    </CustomerContext.Provider>
  );
}

export default CustomerProvider;
