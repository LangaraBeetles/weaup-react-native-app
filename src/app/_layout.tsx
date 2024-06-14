import BackgroundTasksProvider from "@src/components/providers/BackgroundTasksProvider";
import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { Stack } from "expo-router/stack";

const RootLayout = () => {
  return (
    <PushNotificationsProvider>
      <BackgroundTasksProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="setup" options={{ headerShown: false }} />
        </Stack>
      </BackgroundTasksProvider>
    </PushNotificationsProvider>
  );
};

export default RootLayout;
