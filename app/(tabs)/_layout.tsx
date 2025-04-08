import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import Icon from "@expo/vector-icons/FontAwesome5";

import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Icon size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pokedex"
        options={{
          headerShown: false,
          title: '',
          //tabBarLabel:"",
          tabBarIcon: ({ color }) => renderPokeball(),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Icon size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}


function renderPokeball() {
  return (
    <Image
      source={require('@/assets/images/pokeball.png')}
      style={{ width: 50, height: 50 }}
    />
  );
}
