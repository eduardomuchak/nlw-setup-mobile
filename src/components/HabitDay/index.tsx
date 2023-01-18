import { View, TouchableOpacity, Dimensions } from 'react-native';

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / weekDays - (screenHorizontalPadding + 5);

function HabitDay() {
  return (
    <View>
      <TouchableOpacity
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
      />
    </View>
  );
}

export default HabitDay;
