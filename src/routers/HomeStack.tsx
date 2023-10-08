import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';
import HomeDetailScreen from '@/screens/Home/Details';

export type RootStackParamList = {
  Home: undefined;
  HomeDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '首页',
        }}
      />
      <Stack.Screen
        name="HomeDetail"
        component={HomeDetailScreen}
        options={({ route }) => ({
          title: route.name,
        })}
      />
    </Stack.Navigator>
  );
}
