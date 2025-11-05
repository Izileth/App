import { View, Text, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const rotate = useRef(new Animated.Value(0)).current;
  const logoY = useRef(new Animated.Value(0)).current;
  const screenY = useRef(new Animated.Value(500)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const barOpacity = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0.3)).current;
  const opacity2 = useRef(new Animated.Value(0.3)).current;
  const opacity3 = useRef(new Animated.Value(0.3)).current;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Rotação contínua do círculo externo
    const rotateAnimation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();

    // Animação em cascata dos pontos
    const dotsAnimation = Animated.loop(
      Animated.stagger(200, [
        Animated.sequence([
          Animated.timing(opacity1, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(opacity1, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity2, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(opacity2, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity3, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(opacity3, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ]),
      ])
    );
    dotsAnimation.start();

    // Sequência principal sincronizada - começa após 3.5s
    setTimeout(() => {
      setShowContent(true);
      
      Animated.sequence([
        // Fase 1: Logo desce suavemente (1.2s)
        Animated.parallel([
          Animated.timing(logoY, {
            toValue: 120,
            duration: 1200,
            useNativeDriver: true,
          }),
          // Fade out gradual do texto "Carregando..." e barra
          Animated.timing(loadingOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(barOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        
        // Fase 2: Pausa (500ms)
        Animated.delay(500),
        
        // Fase 3: Logo sobe levando a tela junto (1.4s)
        Animated.parallel([
          Animated.timing(logoY, {
            toValue: -700,
            duration: 1400,
            useNativeDriver: true,
          }),
          Animated.timing(screenY, {
            toValue: 0,
            duration: 1400,
            useNativeDriver: true,
          }),
          // Logo faz fade out nos últimos 600ms
          Animated.sequence([
            Animated.delay(800),
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          // Conteúdo faz fade in nos últimos 1000ms
          Animated.sequence([
            Animated.delay(400),
            Animated.timing(contentOpacity, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start(() => {
        // Para as animações de rotação e pontos quando terminar
        rotateAnimation.stop();
        dotsAnimation.stop();
      });
    }, 3500);
  }, [rotate, logoY, screenY, logoOpacity, contentOpacity, loadingOpacity, barOpacity, opacity1, opacity2, opacity3]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-black">
      {/* Gradient Effects */}
      <View className="absolute -top-24 -right-24 w-72 h-72 bg-red-600 opacity-10 rounded-full" />
      <View className="absolute -bottom-36 -left-36 w-96 h-96 bg-orange-900 opacity-5 rounded-full" />

      {/* Loading Animation Container */}
      <Animated.View 
        style={{ 
          transform: [{ translateY: logoY }],
          opacity: logoOpacity 
        }}
        className="flex-1 justify-center items-center"
      >
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
            style={{ transform: [{ rotate: spin }] }}
            className="absolute w-32 h-32"
          >
            <View className="w-32 h-32 border-2 border-transparent border-b-red-500 border-l-red-500/30 rounded-full" />
          </Animated.View>

          {/* Logo Central */}
          <View className="w-20 h-20 rounded-full bg-neutral-900 border-2 border-red-600 justify-center items-center shadow-lg shadow-red-600/60">
            <Text className="text-3xl text-red-600 font-bold">組</Text>
          </View>

          {/* Texto e Pontos Animados */}
          <Animated.View 
            style={{ opacity: loadingOpacity }}
            className="flex-row items-center mt-12"
          >
            <Text className="text-white text-lg font-semibold tracking-wide">Carregando</Text>
            <Animated.Text style={{ opacity: opacity1 }} className="text-red-600 text-2xl ml-1">.</Animated.Text>
            <Animated.Text style={{ opacity: opacity2 }} className="text-red-600 text-2xl">.</Animated.Text>
            <Animated.Text style={{ opacity: opacity3 }} className="text-red-600 text-2xl">.</Animated.Text>
          </Animated.View>

          {/* Barra de progresso decorativa */}
          <Animated.View 
            style={{ opacity: barOpacity }}
            className="w-48 h-1 bg-neutral-900 rounded-full mt-6 overflow-hidden"
          >
            <Animated.View 
              style={{ 
                transform: [{ 
                  translateX: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-200, 200],
                  })
                }] 
              }}
              className="w-24 h-1 bg-red-600"
            />
          </Animated.View>

          {/* Subtitle */}
          <Animated.View style={{ opacity: loadingOpacity }}>
            <Text className="text-neutral-500 text-xs tracking-widest mt-4">YAKUZA BROTHERHOOD</Text>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Tela Inicial */}
      {showContent && (
        <Animated.View 
          style={{ 
            transform: [{ translateY: screenY }],
            opacity: contentOpacity 
          }}
          className="absolute inset-0 bg-black justify-center items-center px-8"
        >
          <View className="items-center">
            <Text className="text-red-600 text-5xl font-bold mb-2">組</Text>
            <Text className="text-white text-3xl font-bold mb-2">YAKUZA</Text>
            <Text className="text-neutral-400 text-lg tracking-widest mb-12">BROTHERHOOD</Text>
            
            <View className="w-full space-y-4 mt-8">
              <View className="bg-red-600 py-4 px-8 rounded-lg">
                <Text className="text-white text-center text-lg font-bold">ENTRAR</Text>
              </View>
              <View className="bg-neutral-900 border-2 border-red-600 py-4 px-8 rounded-lg">
                <Text className="text-red-600 text-center text-lg font-bold">REGISTRAR</Text>
              </View>
            </View>

            <Text className="text-neutral-600 text-xs mt-12 text-center">
              A lealdade é mais forte que o sangue
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}