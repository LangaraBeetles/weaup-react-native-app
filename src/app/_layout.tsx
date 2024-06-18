import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

const RootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    NunitoBlack: require("../../assets/fonts/NunitoBlack.ttf"),
    NunitoExtraBold: require("../../assets/fonts/NunitoExtraBold.ttf"),
    NunitoBold: require("../../assets/fonts/NunitoBold.ttf"),
    NunitoSemiBold: require("../../assets/fonts/NunitoSemiBold.ttf"),
    NunitoMedium: require("../../assets/fonts/NunitoMedium.ttf"),
    NunitoRegular: require("../../assets/fonts/NunitoRegular.ttf"),
    NunitoLight: require("../../assets/fonts/NunitoLight.ttf"),
    NunitoExtraLight: require("../../assets/fonts/NunitoExtraLight.ttf"),
    NunitoBlackItalic: require("../../assets/fonts/NunitoBlackItalic.ttf"),
    NunitoExtraBoldItalic: require("../../assets/fonts/NunitoExtraBoldItalic.ttf"),
    NunitoBoldItalic: require("../../assets/fonts/NunitoBoldItalic.ttf"),
    NunitoSemiBoldItalic: require("../../assets/fonts/NunitoSemiBoldItalic.ttf"),
    NunitoMediumItalic: require("../../assets/fonts/NunitoMediumItalic.ttf"),
    NunitoItalic: require("../../assets/fonts/NunitoItalic.ttf"),
    NunitoLightItalic: require("../../assets/fonts/NunitoLightItalic.ttf"),
    NunitoExtraLightItalic: require("../../assets/fonts/NunitoExtraLightItalic.ttf"),
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PushNotificationsProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PushNotificationsProvider>
  );
};

export default RootLayout;
