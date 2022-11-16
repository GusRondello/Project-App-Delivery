import jwt from 'jwt-decode';
import api from './baseUrl';

/*
    ** Costumer functions
*/

/* função axios que envia o usuário a ser cadastrado para o backend */
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

/* função axios que retorna os produtos do banco de dados */
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

/* função axios que recebe as informações da order referente ao id para o cliente */
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

/* função axios que retorna do banco de dados todas as orders referentes ao cliente */
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

/* função axios que recebe todos os vendedores cadastrados no banco de dados */
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

/* função axios que envia a order para o banco de dados e recebe como resposta o id */
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

/* função axios que atualiza a mudança de status da order pelo cliente no banco de dados */
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
