import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function Setting() {
  return (
    <View>
      <Text>this is a setting page</Text>
    </View>
  );
}

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}
