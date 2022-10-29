// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { /* useEffect, useState,  */useContext } from 'react';
import CustomerContext from '../context/CustomerContext';
// import { getProducts } from '../services/apiAppDelivery';

function Products() {
  const { productsArray, setProductsArray } = useContext(CustomerContext);
  // const { productsArray, setProductsArray } = useContext(CustomerContext);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   // getProducts().then((data) => setProducts(data));
  //   async function fetchProducts() {
  //     const data = await getProducts(token);
  //     if (data.error === true) {
  //       setErrorMessage(data.message);
  //       saveUserInfo({});
  //       return navigate('/login');
  //     }

  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  // função que recebe o produto e adicionar ou subtratir e, modifica no estado a nova quantidade
  const handleQuantity = (product, operation) => {
    const newProducts = productsArray.map((item) => {
      if (item.id === product.id) {
        const newQuantity = operation === 'add' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setProductsArray(newProducts);
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
