import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {


  return (
    <>
      <StatusBar backgroundColor='#333' />

      <Tabs
        screenOptions={{
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name='invoice'
          options={{
            title: 'Faturas',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'barcode' : 'barcode'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
