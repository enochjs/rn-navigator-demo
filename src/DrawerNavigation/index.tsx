import { View, Text, Button } from 'react-native';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

type DrawerParamList = {
  Home: undefined;
  Notifications: undefined;
};

type IDrawerScreenProps = DrawerScreenProps<DrawerParamList>;

function HomeScreen() {
  const navigator = useNavigation<IDrawerScreenProps['navigation']>();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home Page</Text>
      <Button title="Go to notifications" onPress={() => navigator.navigate('Notifications')} />
    </View>
  );
}

function NotificationScreen({ navigation }: IDrawerScreenProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Notification Page</Text>
      <Button title="Go to home" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
    </Drawer.Navigator>
  );
}
