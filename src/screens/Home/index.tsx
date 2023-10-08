import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// type IProps = NativeStackScreenProps<{}>;

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('HomeDetail')} />
    </View>
  );
}
