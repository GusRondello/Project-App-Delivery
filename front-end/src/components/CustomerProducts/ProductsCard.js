import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../../context/CustomerContext';
import { ProductsCardS } from './Style';

const DATATESTID_15 = 'customer_products__element-card-title-';
const DATATESTID_16 = 'customer_products__element-card-price-';
const DATATESTID_17 = 'customer_products__img-card-bg-image-';
const DATATESTID_18 = 'customer_products__button-card-add-item-';
const DATATESTID_19 = 'customer_products__button-card-rm-item-';
const DATATESTID_20 = 'customer_products__input-card-quantity-';

/* Responsável por renderizar os elementos do map do componente ProductsComponent */
function ProductsCard({ product }) {
  const { productsArray, setProductsArray,
    setIsCartUpdated } = useContext(CustomerContext);

  /* Função responsável por adicionar ou diminuir o produto ao carrinho
     e enviar o array com a quantidade de produtos atualizada para o context. */
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
    /* isCartUpdated é uma variável que é alterada para true quando o carrinho é atualizado,
       avisando para a aplicação atualizar os componentes que dependem do carrinho. */
    setIsCartUpdated(true);
  };

  return (
    <ProductsCardS>
      <p id="productPrice" data-testid={ `${DATATESTID_16}${product.id}` }>
        R$
        {' '}
        {product.price.replace('.', ',')}
      </p>
      <p id="productImage">
        <img
          data-testid={ `${DATATESTID_17}${product.id}` }
          src={ product.urlImage }
          alt={ product.name }
        />
      </p>
      <div>
        <p id="productName" data-testid={ `${DATATESTID_15}${product.id}` }>
          {product.name === 'Skol Lata 250ml' ? 'Skol Lata 350ml' : product.name}
        </p>
        <div id="quantityDiv">
          {/* Botão para diminuir a quantidade do item; */}
          <button
            id="rmItem"
            type="button"
            data-testid={ `${DATATESTID_19}${product.id}` }
            onClick={ () => handleQuantity('remove') }
          >
            -
          </button>
          {/* Elemento que exibe a quantidade de itens e permite também definir outro valor */}
          <input
            id="quantity"
            type="number"
            data-testid={ `${DATATESTID_20}${product.id}` }
            value={ product.quantity }
            /* No onChange, percorre todos os itens, encontra o elemento correspondente e altera a quantidade */
            onChange={ (event) => {
              const newProductsQtd = productsArray.map((item) => {
                if (item.id === product.id) {
                  return { ...item, quantity: Number(event.target.value) };
                }
                return item;
              });

              setProductsArray(newProductsQtd);
              setIsCartUpdated(true);
            } }
          />
          {/* Botão para atumentar a quantidade do item; */}
          <button
            id="addItem"
            type="button"
            data-testid={ `${DATATESTID_18}${product.id}` }
            onClick={ () => handleQuantity('add') }
          >
            +
          </button>
        </div>
      </div>
    </ProductsCardS>
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
