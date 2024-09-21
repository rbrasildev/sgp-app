import {
  useFonts,
  Poppins_100Thin,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins';

import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '@/src/styles/global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    Poppins_100Thin,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
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
      <StatusBar backgroundColor='#0f172a' />
      <View className='bg-gray-100 flex-1'>
        <InitialLayout />
        <Toast />
      </View>
    </GestureHandlerRootView>
  );
}

