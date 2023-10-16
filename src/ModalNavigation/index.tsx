import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

type ScreenParams = {
  Home: undefined;
  Details: undefined;
  MyModal: undefined;
};

type StackScreenProps = NativeStackScreenProps<ScreenParams>;

function HomeScreen() {
  const navigation = useNavigation<StackScreenProps['navigation']>();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>home Screen</Text>
      <Button onPress={() => navigation.navigate('MyModal')} title="Open Modal" />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Detail screen</Text>
    </View>
  );
}

function ModalScreen() {
  const navigation = useNavigation<StackScreenProps['navigation']>();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Modal screen</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const RootStack = createNativeStackNavigator<ScreenParams>();

export default function ModalNavigation() {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Details" component={DetailsScreen} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
