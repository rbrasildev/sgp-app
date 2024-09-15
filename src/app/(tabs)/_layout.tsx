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
          tabBarInactiveTintColor: '#666',
          tabBarActiveTintColor: '#333',
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
          name='invoice'
          options={{
            title: 'Faturas',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'barcode-scan' : 'barcode-scan'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='support'
          options={{
            title: 'Central de ajuda',
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'account-supervisor-circle' : 'account-supervisor-circle'} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
