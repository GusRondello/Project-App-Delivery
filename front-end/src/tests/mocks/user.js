/* eslint-disable max-len */
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsa'
  + 'WVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6I'
  + 'mN1c3RvbWVyIiwiaWF0IjoxNjY4MDU1MDMzLCJleHAiOjE2NjgxNDE0MzN9.u2IMleZL1Fuc'
  + 'wLtx2rbHNgsZ8_v44aDq644DdCWXj5c';

const CUSTOMER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFt'
  + 'ZSI6IlRlc3QgdXNlciBtb2NrIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZSI6ImN1'
  + 'c3RvbWVyIiwiaWF0IjoxNjY4MDU4MjcwLCJleHAiOjE2NjgxNDQ2NzB9.lODyX1KnBuKSFpo'
  + 'INWedV9Vs0eUbvKTz8QtHj43Ikxo';

const CUSTOMER_EMAIL = 'zebirita@email.com';
const SELLER_EMAIL = 'fulana@deliveryapp.com';
const SELLER_NAME = 'Fulana Pereira';

const userlogin = {
  email: CUSTOMER_EMAIL,
  password: 'deliveryPassword', // password: deliveryPassword
};

const userInfos = {
  token: TOKEN,
  role: 'customer',
  name: 'Cliente Zé Birita',
  email: CUSTOMER_EMAIL,
  id: 3,
};

const adminInfos = {
  token: TOKEN,
  role: 'administrator',
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  id: 1,
};

const sellerInfos = {
  token: TOKEN,
  role: 'seller',
  name: SELLER_NAME,
  email: SELLER_EMAIL,
  id: 2,
};

const costumerCreatedInfos = {
  token: CUSTOMER_TOKEN,
  role: 'customer',
  name: 'Test user mock',
  email: 'test@test.com',
  id: 4,
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
    email: CUSTOMER_EMAIL,
    name: 'Ze Delivery',
    role: 'customer',
  },
  {
    id: 2,
    name: SELLER_NAME,
    email: SELLER_EMAIL,
    role: 'seller',
  },
];

const allUsersUpdated = [
  {
    id: 1,
    email: CUSTOMER_EMAIL,
    name: 'Ze Delivery',
    role: 'customer',
  },
  {
    id: 2,
    name: SELLER_NAME,
    email: SELLER_EMAIL,
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
  TOKEN,
  CUSTOMER_TOKEN,
  userlogin,
  costumerCreatedInfos,
};
