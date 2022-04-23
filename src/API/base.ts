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

const SERVER_PORT = '8080';
const WS_PORT = '1488';

export const server = `http://localhost:${SERVER_PORT}/`;
export const wsServer = `ws://localhost:${WS_PORT}/`;

const instance = axios.create({
  baseURL: server,
});

export default instance;
