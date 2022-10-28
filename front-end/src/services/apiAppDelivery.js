import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

async function singIn(email, password) {
  try {
    const { data } = await api.post('/login', { email, password });
    console.log(data);
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

async function register({ name, email, password }) {
  try {
    const { data } = await api.post('/register', { name, email, password });
    console.log(data);
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

export { singIn, register };
