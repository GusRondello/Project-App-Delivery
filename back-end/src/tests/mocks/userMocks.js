const userMock = {
  id: 1,
  email: 'ze_delivery@email.com',
  name: 'Ze Delivery',
  password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
  role: 'customer'
};

const userCreateData = {
  email: 'ze_delivery@email.com',
  name: 'Ze Delivery',
  password: 'deliveryPassword', // password: deliveryPassword
  role: 'customer'
};

const customerCreateData = {
  email: 'test@test.com',
  name: 'Test User Mock',
  password: 'test_password',
};

const customerCreatedMock = {
  id: 1,
  email: 'test@test.com',
  name: 'Test User Mock',
  role: 'costumer',
};

const userLoginMock = {
  email: 'ze_delivery@email.com',
  password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
};

const sellers = [
  {
		id: 2,
		name: 'Fulana Pereira',
		email: 'fulana@deliveryapp.com',
		role: 'seller'
  },
];

const allUsers = [
  {
    id: 1,
    email: 'ze_delivery@email.com',
    name: 'Ze Delivery',
    role: 'customer'
  },
  {
		id: 2,
		name: 'Fulana Pereira',
		email: 'fulana@deliveryapp.com',
		role: 'seller'
  },
]

const admin = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator'
};

module.exports = {
  userMock,
  userLoginMock,
  sellers,
  allUsers,
  admin,
  customerCreateData,
  customerCreatedMock,
  userCreateData,
};
