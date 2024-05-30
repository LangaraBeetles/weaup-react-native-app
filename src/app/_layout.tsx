import { GluestackUIProvider } from "@gluestack-ui/themed";
import BackgroundTasksProvider from "@src/components/providers/BackgroundTasksProvider";
import { Stack } from "expo-router/stack";

const RootLayout = () => {
  return (
    <BackgroundTasksProvider>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </BackgroundTasksProvider>
  );
};

export default RootLayout;
