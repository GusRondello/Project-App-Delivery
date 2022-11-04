import jwt from 'jwt-decode';
import api from './baseUrl';

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

export default singIn;
