import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import HabitDay, { DAY_SIZE } from '../../components/HabitDay';
import { generateDatesFromYearBeginning } from '../../utils/generateRangeDatesFromYearStart';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDaysSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDaysSize - datesFromYearStart.length;

function Home() {
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
      <View className="flex-row flex-wrap">
        {datesFromYearStart.map((date) => {
          return <HabitDay key={date.toString()} />;
        })}
        {amountOfDaysToFill > 0
          ? Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <TouchableOpacity
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                activeOpacity={0.7}
                key={index}
              />
            ))
          : null}
      </View>
    </View>
  );
}

export default Home;
