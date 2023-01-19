import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import HabitPage from '../screens/Habit';
import HabitRegisterPage from '../screens/HabitRegister';

const { Navigator, Screen } = createNativeStackNavigator();

function AppRoutes() {
  return (
    <Navigator>
      <Screen name="home" component={Home} />
      <Screen name="habit" component={HabitPage} />
      <Screen name="habit-register" component={HabitRegisterPage} />
    </Navigator>
  );
}

export default AppRoutes;