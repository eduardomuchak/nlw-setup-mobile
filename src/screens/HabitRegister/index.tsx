import { ScrollView, View } from 'react-native';
import BackButton from '../../components/BackButton';

function HabitRegisterPage() {
  return (
    <View className={'flex-1 bg-background px-8 pt-16'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
      </ScrollView>
    </View>
  );
}

export default HabitRegisterPage;
