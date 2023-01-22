import { api } from '../lib/axios';

export async function getSummary() {
  const { data } = await api.get('/summary');
  return data;
}

export async function getHabitsByDay(date: string) {
  const { data } = await api.get('/day', { params: { date } });
  return data;
}

export async function createHabit(payload: {
  title: string;
  weekDays: number[];
}) {
  const { data } = await api.post('/habits', payload);
  return data;
}

export async function updateHabit(habitId: string) {
  const { data } = await api.patch(`/habits/${habitId}/toggle`);
  return data;
}
