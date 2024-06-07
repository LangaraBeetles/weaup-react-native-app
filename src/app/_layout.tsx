import { GluestackUIProvider } from "@gluestack-ui/themed";
import BackgroundTasksProvider from "@src/components/providers/BackgroundTasksProvider";
import PushNotificationsProvider from "@src/components/providers/PushNotificationsProvider";
import { Stack } from "expo-router/stack";

const RootLayout = () => {
  return (
    <PushNotificationsProvider>
      <BackgroundTasksProvider>
        <GluestackUIProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="setup" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </BackgroundTasksProvider>
    </PushNotificationsProvider>
  );
};

export default RootLayout;
