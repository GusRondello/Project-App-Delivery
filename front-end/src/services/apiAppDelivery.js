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
    const result = await api.post('/login', {
      email,
      password,
    });

    const { role, name, id } = jwt(result.data.token);

    return { token: result.data.token, role, name, email, id };
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

async function register(name, email, password) {
  try {
    const result = await api.post('/register', {
      name,
      email,
      password,
    });

    const { role } = jwt(result.data.token);

    return { token: result.data.token, role, name, email };
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

async function registerAsAdmin(user, token) {
  try {
    const { name, email, password, role } = user;
    const result = await api.post(
      '/admin/create-user',
      { name, email, password, role },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

// função axios que retorna os produtos do banco de dados
async function getProducts(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get('/customer/products', axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

async function getCustomerOrder(token, id) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get(`/customer/orders/${id}`, axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

async function getAllCustomerOrders(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get('/customer/orders', axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

// função axios que recebe todos os vendedores cadastrados no banco de dados
async function getSellers(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get('/customer/sellers', axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

// função axios que envia o pedido para o banco de dados e recebe o id do pedido
async function sendOrder(token, requisition) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.post(
      '/customer/checkout',
      { ...requisition },
      axiosToken,
    );

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

/*
    ** Seller functions
*/
// função axios que recebe as informações do pedido para o vendedor
async function getSellerOrder(token, id) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get(`/seller/orders/${id}`, axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

// função axios que recebe todos os pedidos para o vendedor
async function getAllSellerOrders(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get('/seller/orders', axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

export { singIn, register, getProducts, sendOrder, getCustomerOrder,
  getAllCustomerOrders, getAllSellerOrders, getSellers, getSellerOrder,
  registerAsAdmin };
