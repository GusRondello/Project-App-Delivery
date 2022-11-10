const SKOL = 'Skol Lata 250ml';
const HEINEKEN = 'Heineken 600ml';

const products = [
  {
    id: 1,
    name: SKOL,
    price: '2.2',
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: HEINEKEN,
    price: '7.5',
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const productsSeller = [
  {
    id: 1,
    name: SKOL,
    price: '2.2',
    product: {
      quantity: 1,
    },
    urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: HEINEKEN,
    price: '7.5',
    product: {
      quantity: 2,
    },
    urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const productInCart = [
  {
    id: 1,
    name: SKOL,
    price: '2.2',
    quantity: 3,
    subtotal: '6,60',
  },
  {
    id: 2,
    name: HEINEKEN,
    price: '7.5',
    quantity: 2,
    subtotal: '15,00',
  },
];

export default {
  products,
  productInCart,
  productsSeller,
};
