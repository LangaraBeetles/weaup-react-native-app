import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { Stack } from "expo-router/stack";

const RootLayout = () => {
  return (
    <PushNotificationsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="setup" options={{ headerShown: false }} />
        </Stack>
    </PushNotificationsProvider>
  );
};

export default RootLayout;
