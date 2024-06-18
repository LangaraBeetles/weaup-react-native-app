import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
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
