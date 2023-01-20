import { api } from '../lib/axios';

export async function fetchData() {
  const { data } = await api.get('/summary');
  return data;
}

export async function createHabit(payload: {
  title: string;
  weekDays: number[];
}) {
  const { data } = await api.post('/habits', payload);
  return data;
}
