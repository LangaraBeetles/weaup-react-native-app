import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const EnableMotionScreen = () => {
  const next = () => {
    router.push("/setup/select-mode");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="50%" />

          <Stack gap={40}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Enable Motion & Fitness
              </Text>
              <Text align="center">
                For WeaUp to accurately track your posture, it needs access to
                your physical activity. We only use this data to detect
                postures.
              </Text>
            </Stack>

            <Stack border={1} p={15} borderRadius={10}>
              <Text align="left" level="footnote">
                Follow These Steps:
              </Text>
              <Text align="left" level="footnote">
                1. Go to Settings
              </Text>
              <Text align="left" level="footnote">
                2. Tap Privacy
              </Text>
              <Text align="left" level="footnote">
                3. Select Motion & Fitness and turn it on
              </Text>
              <Text align="left" level="footnote">
                4. Enable permissions for WeaUp
              </Text>
            </Stack>

            <Button title="Go to Settings" onPress={next} variant="primary" />
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EnableMotionScreen;
