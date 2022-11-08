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

const saleCreated = {
  id: 1,
  userId: '3',
  sellerId: '2',
  totalPrice: '190.56',
  deliveryAddress: 'Rua da Pamonha',
  deliveryNumber: '27',
  saleDate: '2022-11-08T01:15:46.034Z',
  status: 'Pendente',
};

const customerSale = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '29.50',
  deliveryAddress: 'Rua Xablau',
  deliveryNumber: '198',
  status: 'Pendente',
  saleDate: '2022-11-04T18:19:11.000Z',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      product: {
        quantity: 10,
      },
    },
  ],
};

export default { customerSales, saleCreated, customerSale };
