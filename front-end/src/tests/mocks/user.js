/* eslint-disable max-len */
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJpZCI6NCwibmFtZSI6IlRlc3QgdXNlciBtb2Nr'
  + 'IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZ'
  + 'SI6ImN1c3RvbWVyIiwiaWF0IjoxNjY3NTIwMDY3LCJleHA'
  + 'iOjE2Njc2MDY0Njd9.XJZZVi3A5JcVXH_2qXhq'
  + 'JqXnqdDJLVmcaAmmb61aLWE';

const userInfos = {
  token: TOKEN,
  role: 'customer',
  name: 'Test user mock',
  email: 'test@test.com',
  id: 1,
};

const adminInfos = {
  token: TOKEN,
  role: 'administrator',
  name: 'Test amin mock',
  email: 'admin@test.com',
  id: 1,
};

const sellerInfos = {
  token: TOKEN,
  role: 'seller',
  name: 'Test user mock',
  email: 'test@test.com',
  id: 1,
};

const userRegisterByAdmin = {
  id: 3,
  name: 'Xablau Silva',
  email: 'xablau@email.com',
  role: 'seller',
};

const allUsers = [
  {
    id: 1,
    email: 'ze_delivery@email.com',
    name: 'Ze Delivery',
    role: 'customer',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
];

const allUsersUpdated = [
  {
    id: 1,
    email: 'ze_delivery@email.com',
    name: 'Ze Delivery',
    role: 'customer',
  },
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Xablau Silva',
    email: 'xablau@email.com',
    role: 'seller',
  },
];

export default {
  userInfos,
  sellerInfos,
  userRegisterByAdmin,
  allUsers,
  allUsersUpdated,
  adminInfos,
};
