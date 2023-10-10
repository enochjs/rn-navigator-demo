import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CompositeScreenProps, NavigatorScreenParams, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

type HomeParamList = {
  Home: undefined;
  Details: { id: string } | undefined;
};

type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeParamList>;
  Settings: undefined;
};

type HomeScreenProps = CompositeScreenProps<BottomTabScreenProps<TabParamList, 'HomeStack'>, NativeStackScreenProps<HomeParamList>>;

const Tab = createBottomTabNavigator<TabParamList>();

function DetailsScreen() {
  const route = useRoute<RouteProp<HomeParamList, 'Details'>>();
  const navigation = useNavigation<HomeScreenProps['navigation']>();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Details {route.params?.id}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps['navigation']>();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home!</Text>
      <Button title="Go to Details" onPress={() => navigation.push('Details')} />
    </View>
  );
}

function SettingScreen() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Setting!</Text>
      <Button
        title="Go to HomeStack Details"
        onPress={() =>
          navigation.navigate('HomeStack', {
            screen: 'Details',
            params: {
              id: '====come in form test====',
            },
          })
        }
      />
    </View>
  );
}

// HomeStack
const HomeStack = createNativeStackNavigator<HomeParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarBadge: 3,
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
