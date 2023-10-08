import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/index';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeDetail'>;

export default function HomeDetailScreen(props: Props) {
  const { navigation, route } = props;

  console.log('====route', route.params);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>detail screens</Text>
      <Text>{route.params.id}</Text>
      <Button title="Go to Details... Again" onPress={() => navigation.push('HomeDetail', { id: '123' })} />
    </View>
  );
}
