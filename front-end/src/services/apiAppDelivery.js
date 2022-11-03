import axios from 'axios';
import jwt from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

/*
    ** Common functions
*/
async function singIn(email, password) {
  try {
    const { data/* , status, statusText */ } = await api.post('/login', {
      email,
      password,
    });
    // console.log(data, status, statusText);
    const { role, name, id } = jwt(data.token);
    return { token: data.token, role, name, email, id };
  } catch (err) {
    console.log(err.response.status);
    console.log(err.response.data.message);
    console.log(err);
    return {
      error: true,
      status: err.response.status,
      message: err.response.data.message,
    };
  }
}

async function register(name, email, password) {
  try {
    const { data, status, statusText } = await api.post('/register', {
      name,
      email,
      password,
    });
    console.log(data, status, statusText);
    const { role } = jwt(data.token);
    return { token: data.token, role, name, email };
  } catch (err) {
    console.log(err.response.status);
    console.log(err.response.data.message);
    console.log(err);
    return {
      error: true,
      status: err.response.status,
      message: err.response.data.message,
    };
  }
}

/*
    ** Admin functions
*/
async function registerAsAdmin(user, token) {
  const { name, email, password, role } = user;

  try {
    const { data, status, statusText } = await api.post(
      '/admin/create-user',
      {
        name,
        email,
        password,
        role,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    console.log(data, status, statusText);
    return data;
  } catch (err) {
    console.log(err.response.status);
    console.log(err.response.data.message);
    console.log(err);
    return {
      error: true,
      status: err.response.status,
      message: err.response.data.message,
    };
  }
}

/*
    ** Customer functions
*/
// função axios que retorna os produtos do banco de dados
async function getProducts(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const { data, status, statusText } = await api
      .get('/customer/products', axiosToken);
    console.log(data, status, statusText);
    return data;
  } catch (err) {
    console.log(err.response.status);
    console.log(err.response.data.message);
    console.log(err);
    return {
      error: true,
      status: err.response.status,
      message: err.response.data.message,
    };
  }
}

async function getCustomerOrder(token, id) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const /* { data: sale, status, statusText } */ order = await api
    .get(`/customer/orders/${id}`, axiosToken).catch((err) => {
      console.error(err);
      return err;
    });
  if (!order.data) {
    return order.response.data;
  }
  return order.data;
}

async function getAllCustomerOrders(token) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const orders = await api
    .get('/customer/orders', axiosToken).catch((err) => {
      console.error(err);
      return err;
    });
  if (!orders.data) {
    return orders.response.data;
  }
  return orders.data;
}

// função axios que recebe todos os vendedores cadastrados no banco de dados
async function getSellers(token) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const /* { data: sale, status, statusText } */ orders = await api
    .get('/customer/sellers', axiosToken).catch((err) => {
      console.error(err);
      return err;
    });
  if (!orders.data) {
    return orders.response.data;
  }
  return orders.data;
}

// função axios que envia o pedido para o banco de dados e recebe o id do pedido
async function sendOrder(token, requisition) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const order = await api
    .post('/customer/checkout', { ...requisition }, axiosToken)
    .catch((err) => {
      console.error(err);
      return err;
    });
  if (!order.data) {
    return order.response.data;
  }
  return order.data;
}

/*
    ** Seller functions
*/
// função axios que recebe as informações do pedido para o vendedor
async function getSellerOrder(token, id) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const order = await api
    .get(`/seller/orders/${id}`, axiosToken).catch((err) => {
      console.error(err);
      return err;
    });
  if (!order.data) {
    return order.response.data;
  }
  return order.data;
}

// função axios que recebe todos os pedidos para o vendedor
async function getAllSellerOrders(token) {
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const orders = await api
    .get('/seller/orders', axiosToken).catch((err) => {
      console.error(err);
      return err;
    });
  if (!orders.data) {
    return orders.response.data;
  }
  return orders.data;
}

// função axios que envia a atualização do pedido para o banco de dados
async function sendOrderStatusUpdate(token, requisition, id) {
  console.log('requisition', requisition, id);
  const axiosToken = {
    headers: {
      Authorization: token,
    },
  };
  const orders = await api
    .patch(`/seller/orders/${id}`, { ...requisition }, axiosToken)
    .catch((err) => {
      console.error(err);
      return err;
    });
  if (!orders.data) {
    return orders.response.data;
  }
  return orders.data;
}

export { singIn, register, getProducts, sendOrder, getCustomerOrder,
  getAllCustomerOrders, getAllSellerOrders, getSellers, getSellerOrder,
  registerAsAdmin, sendOrderStatusUpdate };
