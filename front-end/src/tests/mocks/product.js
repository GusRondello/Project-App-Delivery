const products = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.2',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.5',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const productsSeller = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.2',
    product: {
      quantity: 1,
    },
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: '7.5',
    product: {
      quantity: 2,
    },
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const productInCart = [
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: '6.98',
    quantity: 2,
    subtotal: '3,49',
  },
];

export default {
  products,
  productInCart,
  productsSeller,
};
