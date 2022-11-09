import api from './baseUrl';

/*
    ** Admin functions
*/
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

// função axios que recebe todos os usuários cadastrados no banco de dados
async function getUsers(token) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    const result = await api.get('/admin/users', axiosToken);

    return result.data;
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

// função axios que envia o usuário a ser exluído para o backend
async function excludeUser(token, id) {
  try {
    const axiosToken = {
      headers: {
        Authorization: token,
      },
    };
    await api.delete(`/admin/users/${id}`, axiosToken);
  } catch (error) {
    console.log(error);

    if (error?.response?.data) {
      return error.response.data;
    }

    return { error };
  }
}

export {
  registerAsAdmin,
  getUsers,
  excludeUser,
};
