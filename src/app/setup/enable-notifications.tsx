import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const EnableNotificationsScreen = () => {
  const next = () => {
    router.push("/setup/set-up-goal1");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Get Real-time Alerts
              </Text>
              <Text align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </Stack>

            {/* TODO: Allow notifications functionality */}
            <Stack>
              <Button
                title="Allow Notifications"
                onPress={next}
                variant="primary"
              />
              <Button title="Maybe Later" onPress={next} variant="secondary" />
            </Stack>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EnableNotificationsScreen;
