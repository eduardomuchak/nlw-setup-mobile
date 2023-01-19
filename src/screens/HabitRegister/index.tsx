import { ScrollView, Text, TextInput, View } from 'react-native';
import BackButton from '../../components/BackButton';
import HabitCheckbox from '../../components/HabitCheckbox';
import { useState } from 'react';

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
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    const alreadySelected = weekDays.includes(weekDayIndex);

    if (alreadySelected) {
      const filteredWeekDays = weekDays.filter((day) => day !== weekDayIndex);
      setWeekDays(filteredWeekDays);
    } else {
      // setWeekDays((prevState) => [...prevState, weekDayIndex]);
      // ou
      setWeekDays([...weekDays, weekDayIndex]);
    }
  }

  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual é o seu comprometimento?
        </Text>

        <TextInput
          className={`
          h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white
          focus:border-2 border-violet-500 outline-none
          `}
          placeholder="Digite aqui"
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual é a recorrência?
        </Text>

        {weekDayNames.map((weekDay, index) => {
          return (
            <HabitCheckbox
              key={`${weekDay}-${index}`}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => {
                handleToggleWeekDay(index);
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default HabitRegisterPage;
