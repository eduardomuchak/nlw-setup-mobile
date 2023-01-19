import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

function BackButton() {
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity onPress={goBack}>
      <Feather name="arrow-left" size={24} color={colors.gray[100]} />
    </TouchableOpacity>
  );
}

export default BackButton;
