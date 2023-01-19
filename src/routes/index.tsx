import { View } from 'react-native';
import AppRoutes from './app.routes';
import { NavigationContainer } from '@react-navigation/native';

function Routes() {
  return (
    <View className="flex-1 bg-background ">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}

export default Routes;
