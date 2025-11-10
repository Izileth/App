import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";

export const KanjiLoader = () => {
  const kanjis = ['無', '道', '心', '力', '技', '流', '空', '剣'];
  const animatedValues = useRef(
    kanjis.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = animatedValues.map((animValue, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
    });

    Animated.parallel(animations).start();
  }, [animatedValues]);

  return (
    <View className="flex-row gap-1">
      {kanjis.slice(0, 3).map((kanji, index) => {
        const opacity = animatedValues[index].interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.2, 1, 0.2],
        });

        const scale = animatedValues[index].interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.8, 1.2, 0.8],
        });

        return (
          <Animated.Text
            key={index}
            style={{
              opacity,
              transform: [{ scale }],
            }}
            className="text-white text-xl font-bold"
          >
            {kanji}
          </Animated.Text>
        );
      })}
    </View>
  );
};
