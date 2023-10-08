import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import HomeDetailScreen from '@/screens/Home/Details';

const Stack = createNativeStackNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home Screen',
          }}
        />
        <Stack.Screen name="HomeDetail" component={HomeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
