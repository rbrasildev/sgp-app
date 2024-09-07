import { isLoaded, useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '@/src/styles/global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  function InitialLayout() {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {

      if (isLogged) {
        router.replace("/(tabs)")
      } else {
        router.replace("/login")
      }
    }, [isLogged])
    return <Slot />
  }

  return (
    <GestureHandlerRootView >
      <StatusBar backgroundColor='#333' />
      <View className='bg-gray-100 flex-1'>

      <InitialLayout />
      </View>
    </GestureHandlerRootView>
  );
}
