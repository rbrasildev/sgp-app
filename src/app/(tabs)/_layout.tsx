import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {


  return (
    <>
      <StatusBar backgroundColor='#0f172a' />
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
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name='invoice'
          options={{
            headerLeft: () => (<MaterialCommunityIcons name='barcode' size={20} color={'#ccc'} />),
            headerShown: true,
            headerStyle: { backgroundColor: '#0f172a' },
            headerLeftContainerStyle: { paddingHorizontal: 16, marginHorizontal: -20 },
            headerTitleStyle: { color: '#ccc' },
            title: 'Faturas',
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'barcode-scan' : 'barcode-scan'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='consumption'
          options={{
            headerLeft: () => (<MaterialCommunityIcons name='barcode' size={20} color={'#ccc'} />),
            headerShown: true,
            headerStyle: { backgroundColor: '#0f172a' },
            headerLeftContainerStyle: { paddingHorizontal: 16, marginHorizontal: -20 },
            headerTitleStyle: { color: '#ccc' },
            title: 'Consumo',
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'chart-arc' : 'chart-arc'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='speedtest'
          options={{
            headerLeft: () => (<MaterialCommunityIcons name='speedometer' size={20} color={'#ccc'} />),
            headerStyle: { backgroundColor: '#0f172a' },
            headerLeftContainerStyle: { paddingHorizontal: 16, marginHorizontal: -20 },
            headerTitleStyle: { color: '#ccc' },
            title: 'Teste de Velocidade',
            tabBarLabel: 'SpeedTest',
            tabBarLabelStyle: { fontWeight: 'bold' },
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons size={28} name={focused ? 'speedometer' : 'speedometer-slow'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name='support'
          options={{
            headerLeft: () => (<MaterialCommunityIcons name='headphones' size={20} color={'#ccc'} />),
            headerStyle: { backgroundColor: '#0f172a' },
            headerLeftContainerStyle: { paddingHorizontal: 16, marginHorizontal: -20 },
            headerTitleStyle: { color: '#ccc' },
            title: 'Central de ajuda',
            tabBarLabel: 'Suporte',
            tabBarLabelStyle: { fontWeight: 'bold' },
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
