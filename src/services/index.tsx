import { api } from '../lib/axios';

export async function fetchData() {
  const { data } = await api.get('/summary');
  return data;
}
