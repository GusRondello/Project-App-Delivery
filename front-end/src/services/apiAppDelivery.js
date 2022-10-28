import axios from 'axios';
import jwt from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function singIn(email, password) {
  try {
    const { data, status, statusText } = await api.post('/login', { email, password });
    console.log(data, status, statusText);
    const { role } = jwt(data.token);
    return { token: data.token, role };
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
    return { token: data.token, role };
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

export { singIn, register };
