import { Text, View, ScrollView, Alert } from 'react-native';
import Header from '../../components/Header';
import HabitDay, { DAY_SIZE } from '../../components/HabitDay';
import { generateDatesFromYearBeginning } from '../../utils/generateRangeDatesFromYearStart';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getSummary } from '../../services';
import { useCallback, useState } from 'react';
import Loading from '../../components/Loading';
import dayjs from 'dayjs';

type Summary = {
  id: string;
  date: Date;
  amount: number;
  completed: number;
};

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<Summary[] | null>(null);
  const { navigate } = useNavigation();

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const datesFromYearStart = generateDatesFromYearBeginning();
  const minimumSummaryDaysSize = 18 * 7;
  const amountOfDaysToFill = minimumSummaryDaysSize - datesFromYearStart.length;

  const handleRequest = async () => {
    try {
      setIsLoading(true);
      const response = await getSummary();
      setSummary(response);
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleRequest();
    }, []),
  );

  if (isLoading) return <Loading />;

  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={`${index}-${day}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {summary ? (
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map((date) => {
              const dayWithHabit = summary.find((day) =>
                dayjs(date).isSame(day.date, 'day'),
              );

              return (
                <HabitDay
                  key={date.toString()}
                  onPress={() =>
                    navigate('habit', {
                      date: date.toISOString(),
                    })
                  }
                  date={date}
                  amountOfHabits={dayWithHabit?.amount}
                  amountOfCompletedHabits={dayWithHabit?.completed}
                />
              );
            })}
            {amountOfDaysToFill > 0
              ? Array.from({ length: amountOfDaysToFill }).map((_, index) => (
                  <View
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                    key={index}
                  />
                ))
              : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

export default Home;
