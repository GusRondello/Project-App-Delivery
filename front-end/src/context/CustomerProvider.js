import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomerContext from './CustomerContext';
import { getProducts } from '../services/apiAppDelivery';
import saveCartItems from '../helpers/saveCartItems';
import getCartItems from '../helpers/getCartItems';
import saveTotalPrice from '../helpers/saveTotalPrice';
// import getTotalPrice from '../helpers/getTotalPrice';
import getUserInfo from '../helpers/getUserInfo';
import saveUserInfo from '../helpers/saveUserInfo';

// const mockProducts = [
//   {
//     id: 1,
//     name: 'Skol Lata 250ml',
//     price: 2.20,
//     urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
//   },
//   {
//     id: 2,
//     name: 'Heineken 600ml',
//     price: 7.50,
//     urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
//   },
//   {
//     id: 3,
//     name: 'Antarctica Pilsen 300ml',
//     price: 2.49,
//     urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
//   },
//   {
//     id: 4,
//     name: 'Brahma 600ml',
//     price: 7.50,
//     urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
//   },
//   {
//     id: 5,
//     name: 'Skol 269ml',
//     price: 2.19,
//     urlImage: 'http://localhost:3001/images/skol_269ml.jpg',
//   },
//   {
//     id: 6,
//     name: 'Skol Beats Senses 313ml',
//     price: 4.49,
//     urlImage: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
//   },
//   {
//     id: 7,
//     name: 'Becks 330ml',
//     price: 4.99,
//     urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
//   },
//   {
//     id: 8,
//     name: 'Brahma Duplo Malte 350ml',
//     price: 2.79,
//     urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
//   },
//   {
//     id: 9,
//     name: 'Becks 600ml',
//     price: 8.89,
//     urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
//   },
//   {
//     id: 10,
//     name: 'Skol Beats Senses 269ml',
//     price: 3.57,
//     urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
//   },
//   {
//     id: 11,
//     name: 'Stella Artois 275ml',
//     price: 3.49,
//     urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
//   },
// ];

function CustomerProvider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [cartItems, setCartItems] = useState(getCartItems() || []);
  // const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

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
      const { error, products } = await getProducts(token);
      if (error === true) {
        saveUserInfo({});
        return navigate('/login');
      }
      const productsWithQtd = products.map((product) => ({ ...product, quantity: 0 }));
      // console.log('productsAPI', productsWithQtd);
      // transforma a chave price em string e deixa com 2 cadas decimais
      const productsWithQtdAndPrice = productsWithQtd.map((product) => {
        const { price } = product;
        const priceToFixed = price.toFixed(2);
        console.log('priceToFixed ', priceToFixed);
        const priceString = priceToFixed.toString();
        return { ...product, price: priceString };
      });
      console.log('productsWithQtdAndPrice', productsWithQtdAndPrice);
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
        const subtotal = (price * quantity).toFixed(2);
        return { ...product, subtotal };
      });
      // adiciona o totalPrice ao carrinho, arredondando para 2 casas decimais
      const totalPriceCart = cartWithSubtotal.reduce((acc, product) => {
        const { price, quantity } = product;
        return acc + (price * quantity);
      }, 0).toFixed(2).replace('.', ',');
      console.log('totalPriceCart', totalPriceCart);
      // o valor de totalPriceCart deve ser separado por vírgula ao invés de ponto
      // const totalPriceCartString = totalPriceCart.toString().replace('.', ',');
      // constroi um objeto com duas chaves, uma produtos e outra totalPrice
      // const cartWithTotalPrice = { products: cartWithSubtotal,
      //   totalPrice: totalPriceCart };
      console.log('cartWithSubtotal', cartWithSubtotal, totalPriceCart);
      saveCartItems(cartWithSubtotal);
      setCartItems(cartWithSubtotal);
      saveTotalPrice(totalPriceCart);
      setIsCartUpdated(false);
    }
  }, [productsArray]);

  const contextValue = useMemo(() => ({
    productsArray,
    setProductsArray,
    setIsCartUpdated,
    cartItems,
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
