

import { ScrollView, Text } from 'react-native';
import FarmCard from "../components/FarmCard";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <Text className="text-2xl font-bold mb-6 text-text">
        Hybrid Farm Estate 🌾
      </Text>

      <FarmCard
        title="Maize Farm"
        location="Kaduna"
        stage="Growing"
        roi="18%"
      />

      <FarmCard
        title="Rice Farm"
        location="Kebbi"
        stage="Planting"
        roi="15%"
      />
    </ScrollView>
  );
}