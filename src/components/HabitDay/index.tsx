import {
  View,
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from 'react-native';
import { generateProgressPercentage } from '../../utils/generetaProgressPercentage';
import clsx from 'clsx';
import dayjs from 'dayjs';

const weekDays = 7;
const screenHorizontalPadding = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get('screen').width / weekDays - (screenHorizontalPadding + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountOfCompletedHabits?: number;
  date: Date;
}

function HabitDay({
  amountOfHabits = 0,
  amountOfCompletedHabits = 0,
  date,
  ...rest
}: Props) {
  const progress =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountOfCompletedHabits)
      : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrantDay = dayjs(date).isSame(today, 'day');

  return (
    <View>
      <TouchableOpacity
        className={clsx('rounded-xl border-2 m-1', {
          ['bg-zinc-900 border-zinc-800']: progress === 0,
          ['bg-violet-900 border-violet-800']: progress > 0 && progress < 20,
          ['bg-violet-800  border-violet-700']: progress >= 20 && progress < 40,
          ['bg-violet-700  border-violet-600']: progress >= 40 && progress < 60,
          ['bg-violet-600  border-violet-500']: progress >= 60 && progress < 80,
          ['bg-violet-500 border-violet-400']: progress >= 80,
          ['border-violet-400 border-3']: isCurrantDay,
        })}
        style={{ width: DAY_SIZE, height: DAY_SIZE }}
        activeOpacity={0.7}
        {...rest}
      />
    </View>
  );
}

export default HabitDay;
