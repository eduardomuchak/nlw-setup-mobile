import axios from 'axios';

const URL = 'http://192.168.1.6:8080';

export const api = axios.create({
  baseURL: URL,
});
