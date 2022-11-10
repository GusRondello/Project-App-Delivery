import jwt from 'jwt-decode';
import api from './baseUrl';

async function register(name, email, password) {
  try {
    const result = await api.post('/register', {
      name,
      email,
      password,
    });
    const { role } = jwt(result.data.token);
    console.log(role);

    return { token: result.data.token, role, name, email };
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

/*
    ** Customer functions
*/
// função axios que retorna os produtos do banco de dados

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

// função axios que envia o pedido para o banco de dados e recebe o id do pedido
async function updateOrderStatus(token, requisition, id) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api
      .patch(`/customer/orders/${id}`, { ...requisition }, axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

export {
  register,
  getProducts,
  getCustomerOrder,
  getAllCustomerOrders,
  getSellers,
  sendOrder,
  updateOrderStatus,
};
