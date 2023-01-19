import { ScrollView, Text, TextInput, View } from 'react-native';
import BackButton from '../../components/BackButton';

function HabitRegisterPage() {
  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-smibold text-base">
          Qual é o seu comprometimento?
        </Text>

        <TextInput
          className={`
          h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white
          focus:border-2 border-violet-500 outline-none
          `}
          placeholder="Digite aqui"
        />
      </ScrollView>
    </View>
  );
}

export default HabitRegisterPage;
