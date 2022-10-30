// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { /* useEffect, useState,  */useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
// import saveCartItem from '../helpers/saveCartItem';
// import { getProducts } from '../services/apiAppDelivery';

function Products() {
  const { productsArray, setProductsArray,
    setIsCartUpdated } = useContext(CustomerContext);

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
  const handleQuantity = (product, operation) => {
    const newProductsQtd = productsArray.map((item) => {
      if (item.id === product.id) {
        const newQuantity = operation === 'add' ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity < 0) return { ...item, quantity: 0 };
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    // handleCartOnLocalStorage(newProductsQtd);
    setProductsArray(newProductsQtd);
    setIsCartUpdated(true);
  };

  return (
    <div>
      {productsArray?.map((product) => (
        <div key={ product.id }>
          <p data-testid={ `customer_products__element-card-title-<${product.id}>` }>
            {product.name}
          </p>
          <p data-testid={ `customer_products__element-card-price-<${product.id}>` }>
            {product.price}
          </p>
          <p data-testid={ `customer_products__img-card-bg-image-<${product.id}>` }>
            <img src={ product.url_image } alt={ product.name } />
          </p>
          <div>
            {/* Botão para diminuir quantidade de itens; */}
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-<${product.id}>` }
              onClick={ () => handleQuantity(product, 'remove') }
            >
              -
            </button>
            {/* Elemento que exibe a quantidade de itens atual do produto */}
            <p data-testid={ `customer_products__input-card-quantity-<${product.id}>` }>
              {product.quantity}
            </p>
            {/* Botão para adicionar quantidade de itens; */}
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-<${product.id}>` }
              onClick={ () => handleQuantity(product, 'add') }
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
