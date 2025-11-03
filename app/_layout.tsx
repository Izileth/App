
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./_loading";
import '@/global.css';

// Simulate checking for a token
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, you'd check for a token here
      setIsAuthenticated(false); // Start with the user logged out
      setIsLoading(false);
    }, 2000); // 2-second loading screen

    return () => clearTimeout(timer);
  }, []);

  return { isAuthenticated, isLoading };
};

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/");
    } else if (!isAuthenticated && inApp) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}
