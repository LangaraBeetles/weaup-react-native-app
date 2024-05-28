import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default RootLayout;
