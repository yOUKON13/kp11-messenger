const axios = require('axios');

export type Response<T> = {
  data: T;
};

export function newHeaders() {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
});

export default instance;
