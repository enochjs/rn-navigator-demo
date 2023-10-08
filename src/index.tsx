import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import HomeDetailScreen from '@/screens/Home/Details';

export type RootStackParamList = {
  Home: undefined;
  HomeDetail: { id: string };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Routers() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '首页',
          }}
        />
        <RootStack.Screen
          name="HomeDetail"
          component={HomeDetailScreen}
          options={({ route }) => ({
            title: route.name,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
