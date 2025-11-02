import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Tema Yakuza - Vermelho e Preto
const Colors = {
  light: {
    background: "#000000",
    tint: "#dc2626", // vermelho
    inactive: "#737373",
    border: "#000000",
  },
  dark: {
    background: "#000000",
    tint: "#dc2626", // vermelho
    inactive: "#737373",
    border: "#000000",
  },
};

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 2,
          borderTopColor: theme.border,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          shadowOpacity: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.inactive,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: focused ? '#ffffff' : '#111',
            }}>
              <Text style={{ 
                fontSize: 22,
                lineHeight: 22,
                
              }}>
                H
              </Text>
              <Text style={{ 
                color: color, 
                fontSize: 14,
                fontWeight: '700',
                letterSpacing: 1.5,
              }}>
                組
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: 8,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: focused ? '#ffffff' : '#111',
            }}>
              <Text style={{ 
                fontSize: 22,
                lineHeight: 22,
              }}>
                E
              </Text>
              <Text style={{ 
                color: color, 
                fontSize: 14,
                fontWeight: '700',
                letterSpacing: 1.5,
              }}>
                探索
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
