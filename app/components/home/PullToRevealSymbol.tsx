import { Animated, Text, View } from 'react-native';

type PullToRevealSymbolProps = {
  scrollY: Animated.Value;
};

export function PullToRevealSymbol({ scrollY }: PullToRevealSymbolProps) {
  const symbolOpacity = scrollY.interpolate({
    inputRange: [-100, -50, 0],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const symbolScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 0.8],
    extrapolate: 'clamp',
  });

  const symbolTranslateY = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: symbolOpacity,
        transform: [{ scale: symbolScale }, { translateY: symbolTranslateY }],
      }}
      pointerEvents="none"
    >
      <View className="items-center py-10">
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-px bg-neutral-800" />
          <Text className="text-neutral-700 text-2xl">罪</Text>
          <View className="w-12 h-px bg-neutral-800" />
        </View>
      </View>
    </Animated.View>
  );
}
