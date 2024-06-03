import { GluestackUIProvider } from "@gluestack-ui/themed";
import BackgroundTasksProvider from "@src/components/providers/BackgroundTasksProvider";
import HeadTrackingProvider from "@src/components/providers/HeadTrackingProvider.ios";
import { Stack } from "expo-router/stack";

const RootLayout = () => {
  return (
    <BackgroundTasksProvider>
    <HeadTrackingProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="setup" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </HeadTrackingProvider>
    </BackgroundTasksProvider>
  );
};

export default RootLayout;
