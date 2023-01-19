import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

function BackButton() {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
      <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  );
}

export default BackButton;
