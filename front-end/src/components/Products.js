// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React/* , { useEffect } */ from 'react';
// import { getProducts } from '../services/apiAppDelivery';

const mockProducts = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: 2.19,
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: 4.49,
    url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: 4.99,
    url_image: 'http://localhost:3001/images/becks_330ml.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: 2.79,
    url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: 8.89,
    url_image: 'http://localhost:3001/images/becks_600ml.jpg',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: 3.57,
    url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: 3.49,
    url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  },
];

function Products() {
  // const [products, setProducts] = React.useState([]);

  // useEffect(() => {
  //   // getProducts().then((data) => setProducts(data));
  //   async function fetchProducts() {
  //     const data = await getProducts();
  //     if (data.error === true) {
  //       setErrorMessage(data.message);
  //       return;
  //     }

  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <div>
      Exibe uma imagem a partir de uma URL
      {mockProducts.map((product, { id }) => (
        <div key={ id }>
          <p data-testid={ `customer_products__element-card-title-<${id}>` }>
            {product.name}
          </p>
          <p data-testid={ `customer_products__element-card-price-<${id}>` }>
            {product.price}
          </p>
          <p data-testid={ `customer_products__img-card-bg-image-<${id}>` }>
            <img src={ product.url_image } alt={ product.name } />
          </p>
          <div>
            {/* Botão para diminuir quantidade de itens; */}
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-<${id}>` }
            >
              -
            </button>
            {/* Elemento que exibe a quantidade de itens atual do produto */}
            <p data-testid={ `customer_products__input-card-quantity-<${id}>` }>
              {product.qtd || 0}
            </p>
            {/* Botão para adicionar quantidade de itens; */}
            <button
              type="button"
              data-testid={ `customer_products__button-card-add-item-<${id}>` }
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
