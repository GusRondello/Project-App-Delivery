import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CustomerContext from './CustomerContext';
import saveCartItem from '../helpers/saveCartItem';
import getCart from '../helpers/getCart';
import { getProducts } from '../services/apiAppDelivery';
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
  const [productsArray, setProductsArray] = useState(getCart());
  const [isCartUpdated, setIsCartUpdated] = useState(false);
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
    const products = getCart();
    // console.log('productsWithQtd', productsWithQtd);
    if (products && products[0].products.length > 0) {
      const productsArrayUpdated = productsWithQtd.map((product) => {
        const { id } = product;
        const productInCart = products[0].products.find((prod) => prod.id === id);
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
      combineWithLocalStorageQtd(productsWithQtd);
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
      // percorre o carrinho e adiciona o subtotal de cada produto
      const cartWithSubtotal = cart.map((product) => {
        const { price, quantity } = product;
        return { ...product, subtotal: price * quantity };
      });
      // adiciona o totalPrice ao carrinho
      const totalPriceCart = cartWithSubtotal.reduce((acc, product) => {
        const { price, quantity } = product;
        return acc + (price * quantity);
      }, 0);
      // constroi um objeto com duas chaves, uma produtos e outra totalPrice
      const cartWithTotalPrice = { products: cartWithSubtotal,
        totalPrice: totalPriceCart };
      // salva o carrinho no localStorage
      console.log('cartWithTotalPrice', cartWithTotalPrice);
      saveCartItem(cartWithTotalPrice);
    }
  }, [productsArray]);

  const contextValue = useMemo(() => ({
    productsArray,
    setProductsArray,
    setIsCartUpdated,
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
