import api from './baseUrl';

/*
    ** Seller functions
*/

/* função axios que recebe as informações da order referente ao id para o vendedor */
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

/* função axios que recebe todas as order referentes ao vendedor */
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

/* função axios que atualiza a mudança de status da order pelo vendedor no banco de dados */
async function sendOrderStatusUpdate(token, requisition, id) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api
      .patch(`/seller/orders/${id}`, { ...requisition }, axiosToken);

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
  getSellerOrder,
  getAllSellerOrders,
  sendOrderStatusUpdate,
};
