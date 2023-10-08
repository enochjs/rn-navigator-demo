import { RootStackParamList } from '@/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ProfileScreenNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// type IProps = NativeStackScreenProps<{}>;
// type IProps = NativeStackScreenProps<RootStackParamList, 'HomeDetail'>;

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 justify-center items-center">
      <Text>home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.push('HomeDetail', { id: '222' });
        }}
      />
    </View>
  );
}
