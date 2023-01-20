import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButton from '../../components/BackButton';
import HabitCheckbox from '../../components/HabitCheckbox';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const weekDayNames = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

function HabitRegisterPage() {
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    const alreadySelected = checkedWeekDays.includes(weekDayIndex);

    if (alreadySelected) {
      const filteredWeekDays = checkedWeekDays.filter(
        (day) => day !== weekDayIndex,
      );
      setCheckedWeekDays(filteredWeekDays);
    } else {
      // setCheckedWeekDays((prevState) => [...prevState, weekDayIndex]);
      // ou
      setCheckedWeekDays([...checkedWeekDays, weekDayIndex]);
    }
  }

  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual é o seu comprometimento?
        </Text>

        <TextInput
          className={`
          h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800
          focus:border-violet-500 outline-none
          `}
          placeholder="Ex.: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
          caretHidden={true}
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual é a recorrência?
        </Text>

        {weekDayNames.map((weekDay, index) => {
          return (
            <HabitCheckbox
              key={`${weekDay}-${index}`}
              title={weekDay}
              checked={checkedWeekDays.includes(index)}
              onPress={() => {
                handleToggleWeekDay(index);
              }}
            />
          );
        })}

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-violet-500 rounded-lg mt-6"
          activeOpacity={0.7}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-white text-base ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default HabitRegisterPage;
