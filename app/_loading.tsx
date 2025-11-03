import { View, Text, Animated } from "react-native";
import { useEffect, useRef } from "react";

export default function LoadingScreen() {
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0.3)).current;
  const opacity2 = useRef(new Animated.Value(0.3)).current;
  const opacity3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Rotação contínua do círculo externo
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Pulsação do logo central
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animação em cascata dos pontos
    const animateDots = () => {
      Animated.loop(
        Animated.stagger(200, [
          Animated.sequence([
            Animated.timing(opacity1, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity1, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacity2, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity2, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacity3, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity3, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateDots();
  }, [rotate, scale, opacity1, opacity2, opacity3]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-black justify-center items-center">
      {/* Gradient Effects */}
      <View className="absolute -top-24 -right-24 w-72 h-72 bg-red-600 opacity-10 rounded-full" />
      <View className="absolute -bottom-36 -left-36 w-96 h-96 bg-orange-900 opacity-5 rounded-full" />

      {/* Loading Animation Container */}
      <View className="items-center">
        {/* Círculo Externo Rotativo */}
        <Animated.View 
          style={{ transform: [{ rotate: spin }] }}
          className="absolute w-32 h-32"
        >
          <View className="w-32 h-32 border-2 border-transparent border-t-red-600 border-r-red-600/50 rounded-full" />
        </Animated.View>

        {/* Círculo Intermediário */}
          <Animated.View 
            style={{
              transform: [
                { rotate: spin },
                { scale }, // use the animated 'scale' value
              ],
            }}
            className="absolute w-32 h-32"
          >
          <View className="w-32 h-32 border-2 border-transparent border-b-red-500 border-l-red-500/30 rounded-full" />
        </Animated.View>

        {/* Logo Central com Pulsação */}
        <Animated.View
          style={{ transform: [{ scale }] }}
          className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-red-600 justify-center items-center shadow-lg shadow-red-600/60"
        >
          <Text className="text-3xl text-red-600 font-bold">組</Text>
        </Animated.View>

        {/* Texto e Pontos Animados */}
        <View className="flex-row items-center mt-12">
          <Text className="text-white text-lg font-semibold tracking-wide">Carregando</Text>
          <Animated.Text style={{ opacity: opacity1 }} className="text-red-600 text-2xl ml-1">.</Animated.Text>
          <Animated.Text style={{ opacity: opacity2 }} className="text-red-600 text-2xl">.</Animated.Text>
          <Animated.Text style={{ opacity: opacity3 }} className="text-red-600 text-2xl">.</Animated.Text>
        </View>

        {/* Barra de progresso decorativa */}
        <View className="w-48 h-1 bg-neutral-900 rounded-full mt-6 overflow-hidden">
          <Animated.View 
            style={{ 
              transform: [{ 
                translateX: rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 200],
                })
              }] 
            }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
          />
        </View>

        {/* Subtitle */}
        <Text className="text-neutral-500 text-xs tracking-widest mt-4">YAKUZA BROTHERHOOD</Text>
      </View>
    </View>
  );
}