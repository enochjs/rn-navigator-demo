import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeDetailScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>detail screens</Text>
      <Button title="Go to Details... Again" onPress={() => navigation} />
    </View>
  );
}
