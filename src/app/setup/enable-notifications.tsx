import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const EnableNotificationsScreen = () => {
  const next = () => {
    router.push("/setup/set-up-goal");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <View style={{ height: "40%" }} />
          <Stack gap={80}>
            <Stack gap={16}>
              <Text style={{ textAlign: "center" }}>Get Real-time Alerts</Text>
              <Text style={{ textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </Stack>

            <Button
              title="Allow Notification"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EnableNotificationsScreen;
