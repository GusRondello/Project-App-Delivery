import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomerContext from './CustomerContext';
import api from '../services';
import saveCartItems from '../helpers/saveCartItems';
import getCartItems from '../helpers/getCartItems';
import saveTotalPrice from '../helpers/saveTotalPrice';
// import getTotalPrice from '../helpers/getTotalPrice';
import getUserInfo from '../helpers/getUserInfo';

function CustomerProvider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems() || []);
  const [sellers, setSellers] = useState([]);

  const navigate = useNavigate();

  // useEffect responsável por receber os sellers da api
  useEffect(() => {
    async function fetchSellers() {
      const { token } = getUserInfo();
      const data = await api.getSellers(token);

      setSellers(data);
      // setSelectedSeller(data[0].id);
    }
    fetchSellers();
  }, []);

  // useEffect que vigia a alteração do productsArray e atualiza o totalPrice baseado
  // no valor e quantidade de cada produto no carrinho
  // useEffect(() => {
  //   const total = productsArray.reduce((acc, product) => {
  //     const { price, quantity } = product;
  //     return acc + (price * quantity);
  //   }, 0);
  //   setTotalPrice(total);
  // }, [productsArray]);

  const combineWithLocalStorageQtd = (productsWithQtd) => {
    const products = getCartItems();
    if (products && products.length > 0) {
      const productsArrayUpdated = productsWithQtd.map((product) => {
        const { id } = product;
        const productInCart = products.find((prod) => prod.id === id);
        // console.log('productInCart', productInCart);
        if (productInCart) {
          return { ...product, quantity: productInCart.quantity };
        }
        return product;
      });
      // console.log('productsArrayUpdated', productsArrayUpdated);
      setProductsArray(productsArrayUpdated);
    } else {
      setProductsArray(productsWithQtd);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      const { token } = getUserInfo();
      const { error, products } = await api.getProducts(token);
      if (error === true) {
        localStorage.removeItem('user');
        return navigate('/login');
      }
      const productsWithQtd = products.map((product) => ({ ...product, quantity: 0 }));
      // console.log('productsAPI', productsWithQtd);
      // transforma a chave price em string e deixa com 2 cadas decimais
      const productsWithQtdAndPrice = productsWithQtd.map((product) => {
        const { price } = product;
        // const priceToFixed = price.toFixed(2);
        const priceString = price.toString();
        return { ...product, price: priceString };
      });
      // console.log('productsWithQtdAndPrice', productsWithQtdAndPrice);
      combineWithLocalStorageQtd(productsWithQtdAndPrice);
      // setProductsArray(productsWithQtd);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isCartUpdated) {
      const cart = productsArray.map((product) => {
        const { urlImage, ...rest } = product;
        return rest;
      }).filter((product) => product.quantity > 0);
      // percorre o carrinho e adiciona o subtotal de cada produto, arredondando para duas casas decimais
      // converte o resultado para number
      const cartWithSubtotal = cart.map((product) => {
        const { price, quantity } = product;
        const subtotal = (price * quantity).toFixed(2).replace('.', ',');
        return { ...product, subtotal };
      });
      // adiciona o totalPrice ao carrinho, arredondando para 2 casas decimais
      const totalPriceCart = cartWithSubtotal.reduce((acc, product) => {
        const { price, quantity } = product;
        return acc + (price * quantity);
      }, 0).toFixed(2).replace('.', ',');
      // console.log('totalPriceCart', totalPriceCart);
      console.log('cartWithSubtotal', cartWithSubtotal, totalPriceCart);
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
