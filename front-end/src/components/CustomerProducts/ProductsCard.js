import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../../context/CustomerContext';

const DATATESTID_15 = 'customer_products__element-card-title-';
const DATATESTID_16 = 'customer_products__element-card-price-';
const DATATESTID_17 = 'customer_products__img-card-bg-image-';
const DATATESTID_18 = 'customer_products__button-card-add-item-';
const DATATESTID_19 = 'customer_products__button-card-rm-item-';
const DATATESTID_20 = 'customer_products__input-card-quantity-';

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
      <p data-testid={ `${DATATESTID_15}${product.id}` }>
        {product.name}
      </p>
      <p data-testid={ `${DATATESTID_16}${product.id}` }>
        {product.price.replace('.', ',')}
      </p>
      <p>
        <img
          data-testid={ `${DATATESTID_17}${product.id}` }
          src={ product.urlImage }
          alt={ product.name }
        />
      </p>
      <div>
        {/* Botão para diminuir a quantidade do item; */}
        <button
          type="button"
          data-testid={ `${DATATESTID_19}${product.id}` }
          onClick={ () => handleQuantity('remove') }
        >
          -
        </button>
        {/* Elemento que exibe a quantidade de itens e permite também definir outro valor */}
        <input
          type="number"
          data-testid={ `${DATATESTID_20}${product.id}` }
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
        {/* Botão para atumentar a quantidade do item; */}
        <button
          type="button"
          data-testid={ `${DATATESTID_18}${product.id}` }
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
