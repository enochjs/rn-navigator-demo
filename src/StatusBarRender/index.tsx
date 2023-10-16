import { DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, Button, StatusBar, StatusBarProps } from 'react-native';

type ScreenParam = {
  Screen1: undefined;
  Screen2: undefined;
};
type IDrawerScreenProps = DrawerScreenProps<ScreenParam>;

function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

function Screen1(props: IDrawerScreenProps) {
  const { navigation } = props;

  return (
    <View className="flex-1 items-center justify-center bg-purple-500">
      <Text>Purple Screen</Text>
      <Button title="Go to Screen2" onPress={() => navigation.navigate('Screen2')} />
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="purple" />
    </View>
  );
}

function Screen2() {
  const navigation = useNavigation<IDrawerScreenProps['navigation']>();

  return (
    <View className="flex-1 items-center justify-center bg-green-500">
      <Text>Green Screen</Text>
      <Button title="Go to Screen1" onPress={() => navigation.navigate('Screen1')} />
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
    </View>
  );
}

const Drawer = createDrawerNavigator<ScreenParam>();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Screen2" component={Screen2} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
