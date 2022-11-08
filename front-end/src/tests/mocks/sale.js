const customerSales = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '190.56',
    deliveryAddress: 'Rua da Pamonha',
    deliveryNumber: '27',
    status: 'Pendente',
    saleDate: '2022-11-05T01:05:29.000Z',
  },
];

const sellerSales = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    totalPrice: '190.56',
    deliveryAddress: 'Rua da Pamonha',
    deliveryNumber: '27',
    status: 'Pendente',
    saleDate: '2022-11-05T01:05:29.000Z',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.2',
        quantity: 1,
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      },
    ],
  },
];

export default { customerSales, sellerSales };
