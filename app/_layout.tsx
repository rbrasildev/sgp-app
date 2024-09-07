import { isLoaded, useFonts } from 'expo-font';
import { router, Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '@/styles/global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
        router.replace("(tabs)")
      } else {
        router.replace("/login")
      }
    }, [isLogged])
    return <Slot />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InitialLayout />
    </GestureHandlerRootView>
  );
}
