const axios = require('axios');

export type Response<T> = {
  data: T;
};

export function newHeaders() {
  const token = localStorage.getItem('token');

  if (token) {
    return { Authorization: `Bearer ${token}` };
  }

  return {};
}

const instance = axios.create({
  baseURL: 'http://26.26.228.204:8080/',
});

export default instance;
