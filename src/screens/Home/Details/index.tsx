import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/routers/HomeStack';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeDetail'>;

export default function HomeDetailScreen(props: Props) {
  const { navigation, route } = props;

  return (
    <View className="flex-1 items-center justify-center">
      <Text>detail screens</Text>
      <Text>{route.params.id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
