import jwt from 'jwt-decode';
import api from './baseUrl';

/*
    ** Common functions
*/

/* função axios que envia o email e o password para o backend e recebe um token em caso de sucesso */
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
