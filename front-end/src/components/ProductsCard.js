import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../context/CustomerContext';

function ProductsCard({ product }) {
  const { productsArray, setProductsArray,
    setIsCartUpdated } = useContext(CustomerContext);

  const handleQuantity = (operation) => {
    const newProductsQtd = productsArray.map((item) => {
      if (item.id === product.id) {
        const newQuantity = operation === 'add' ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity < 0) return { ...item, quantity: 0 };
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setProductsArray(newProductsQtd);
    setIsCartUpdated(true);
  };

  return (
    <div>
      {/* {console.log(product)} */}
      <p data-testid={ `customer_products__element-card-title-${product.id}` }>
        {product.name}
      </p>
      <p data-testid={ `customer_products__element-card-price-${product.id}` }>
        {product.price.replace('.', ',')}
      </p>
      <p data-testid={ `customer_products__img-card-bg-image-${product.id}` }>
        <img src={ product.urlImage } alt={ product.name } />
      </p>
      <div>
        {/* Botão para diminuir quantidade de itens; */}
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          onClick={ () => handleQuantity('remove') }
        >
          -
        </button>
        {/* Elemento que exibe a quantidade de itens e permite também definir outro valor */}
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
          value={ product.quantity }
          onChange={ (e) => {
            const newProductsQtd = productsArray.map((item) => {
              if (item.id === product.id) {
                return { ...item, quantity: Number(e.target.value) };
              }
              return item;
            });
            setProductsArray(newProductsQtd);
            setIsCartUpdated(true);
          } }
        />
        {/* <p data-testid={ `customer_products__input-card-quantity-<${product.id}>` }>
          {product.quantity}
        </p> */}
        {/* Botão para adicionar quantidade de itens; */}
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          onClick={ () => handleQuantity('add') }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    urlImage: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
};

export default ProductsCard;
