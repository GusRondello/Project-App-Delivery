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

const productInCart = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: '2.2',
    quantity: 3,
    subtotal: '6,60',
  },
];

export default {
  products,
  productInCart,
};
