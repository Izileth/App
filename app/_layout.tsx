
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "./auth-context";
import LoadingScreen from "./_loading";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';
import '@/global.css';



const InitialLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isSplashAnimationFinished) {
      const inAppGroup = segments[0] === "(app)";

      if (isAuthenticated && !inAppGroup) {
        router.replace("/(app)");
      } else if (!isAuthenticated) {
        router.replace("/login");
      }
      // After navigation is handled, mark app as ready and start fade out
      setAppReady(true);
    }
  }, [isAuthenticated, isSplashAnimationFinished, segments, router]);

  useEffect(() => {
    if (isAppReady) {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isAppReady, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && (
        <>
          <Slot />
          <StatusBar style="light" backgroundColor="#000000" translucent />
        </>
      )}

      {!isAppReady || opacity.value > 0 && (
        <Animated.View style={[{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }, animatedStyle]}>
          <LoadingScreen onAnimationEnd={() => setSplashAnimationFinished(true)} />
        </Animated.View>
      )}
    </View>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
