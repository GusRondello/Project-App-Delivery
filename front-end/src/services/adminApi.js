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

export default registerAsAdmin;
