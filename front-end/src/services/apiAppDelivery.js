import axios from 'axios';
import jwt from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function singIn(email, password) {
  try {
    const { data, status, statusText } = await api.post('/login', { email, password });
    console.log(data, status, statusText);
    const { role, name } = jwt(data.token);
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

async function register(name, email, password) {
  try {
    const { data, status, statusText } = await api
      .post('/register', { name, email, password });
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

// função axios que retorna os produtos do banco de dados
async function getProducts() {
  try {
    const { data, status, statusText } = await api.get('/products');
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

export { singIn, register, getProducts };
