
import { View, Text, Pressable } from 'react-native';

export default function FarmCard({
  title,
  location,
  stage,
  roi,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
    >
      {/* Title */}
      <Text className="text-lg font-bold text-text">
        {title}
      </Text>

      {/* Location */}
      <Text className="text-sm text-textSecondary mt-1">
        📍 {location}
      </Text>

      {/* Divider */}
      <View className="h-[1px] bg-gray-200 my-3" />

      {/* Bottom Row */}
      <View className="flex-row justify-between items-center">
        
        {/* Stage Badge */}
        <View className="bg-green-100 px-3 py-1 rounded-full">
          <Text className="text-xs text-primary font-medium">
            🌱 {stage}
          </Text>
        </View>

        {/* ROI */}
        <Text className="text-primary font-semibold text-sm">
          {roi} ROI
        </Text>
      </View>
    </Pressable>
  );
}