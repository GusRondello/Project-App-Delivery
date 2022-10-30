// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { /* useEffect, useState,  */useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
import ProductsCard from './ProductsCard';
// import saveCartItem from '../helpers/saveCartItem';
// import { getProducts } from '../services/apiAppDelivery';

function Products() {
  const { productsArray, /* setProductsArray,
    setIsCartUpdated */ } = useContext(CustomerContext);

  // const handleCartOnLocalStorage = (newProductsQtd) => {
  //   const cart = newProductsQtd.map((product) => {
  //     const { urlImage, ...rest } = product;
  //     return rest;
  //   }).filter((product) => product.quantity > 0);
  //   // percorre o carrinho e adiciona o subtotal de cada produto
  //   const cartWithSubtotal = cart.map((product) => {
  //     const { price, quantity } = product;
  //     return { ...product, subtotal: price * quantity };
  //   });
  //   // adiciona o totalPrice ao carrinho
  //   const totalPriceCart = cartWithSubtotal.reduce((acc, product) => {
  //     const { price, quantity } = product;
  //     return acc + (price * quantity);
  //   }, 0);
  //   // constroi um objeto com duas chaves, uma produtos e outra totalPrice
  //   const cartWithTotalPrice = { products: cartWithSubtotal, totalPrice: totalPriceCart };
  //   // salva o carrinho no localStorage
  //   console.log('cartWithTotalPrice', cartWithTotalPrice);
  //   saveCartItem(cartWithTotalPrice);
  // };

  // função que recebe o produto e adicionar ou subtratir e, modifica no estado a nova quantidade
  // const handleQuantity = (product, operation) => {
  //   const newProductsQtd = productsArray.map((item) => {
  //     if (item.id === product.id) {
  //       const newQuantity = operation === 'add' ? item.quantity + 1 : item.quantity - 1;
  //       if (newQuantity < 0) return { ...item, quantity: 0 };
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });
  //   // handleCartOnLocalStorage(newProductsQtd);
  //   setProductsArray(newProductsQtd);
  //   setIsCartUpdated(true);
  // };

  return (
    <div>
      <div>
        {productsArray?.map((product) => (
          <div key={ product.id }>
            <ProductsCard product={ product } />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
