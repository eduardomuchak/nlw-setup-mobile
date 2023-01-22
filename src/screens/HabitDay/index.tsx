import { Alert, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import dayjs from 'dayjs';
import { ProgressBar } from '../../components/ProgressBar';
import HabitCheckbox from '../../components/HabitCheckbox';
import { getHabitsByDay } from '../../services';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { generateProgressPercentage } from '../../utils/generetaProgressPercentage';
import { EmptyHabitsDay } from '../../components/EmptyHabitsDay';
import clsx from 'clsx';

interface Params {
  date: string;
}

interface DayInfo {
  completed: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

function HabitDayPage() {
  const route = useRoute();
  const { date } = route.params as Params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dayInfo, setDayInfo] = useState<null | DayInfo>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const parsedDate = dayjs(date);
  const isDayInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(
        dayInfo.possibleHabits.length,
        completedHabits.length,
      )
    : 0;

  async function fetchHabits() {
    try {
      setIsLoading(true);
      const response = await getHabitsByDay(date);

      setDayInfo(response);
      setCompletedHabits(response.completedHabits);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível buscar as informações dos hábitos');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      if (completedHabits.includes(habitId)) {
        setCompletedHabits((prevState) =>
          prevState.filter((habit) => habit !== habitId),
        );
      } else {
        setCompletedHabits((prevState) => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito');
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx('mt-6', {
            'opacity-50': isDayInPast,
          })}
        >
          {dayInfo?.possibleHabits && dayInfo.possibleHabits.length > 0 ? (
            dayInfo?.possibleHabits.map((habit, index) => (
              <HabitCheckbox
                key={`${index}-${habit.id}`}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={isDayInPast}
              />
            ))
          ) : (
            <EmptyHabitsDay />
          )}
        </View>
        {isDayInPast ? (
          <Text className="text-white mt-10 text-center">
            Você não pode editar hábitos de dias passados
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default HabitDayPage;
