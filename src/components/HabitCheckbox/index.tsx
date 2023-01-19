import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface Props {
  checked?: boolean;
  description: string;
}

function HabitCheckbox({ checked = false, description }: Props) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row mb-2 items-center"
      >
        {checked ? (
          <View className="h-8 w-8 bg-violet-500 rounded-lg flex items-center justify-center">
            <Feather name="check" size={20} color={colors.white} />
          </View>
        ) : (
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
        )}

        <Text
          className={`ml-3 text-white font-semibold ${
            checked ? 'line-through' : ''
          }`}
        >
          {description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default HabitCheckbox;
