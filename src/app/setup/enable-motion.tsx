import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const EnableMotionScreen = () => {
  const next = () => {
    router.replace("/setup/select-mode");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text style={{ textAlign: "center" }}>
                Enable Motion & Fitness
              </Text>
              <Text style={{ textAlign: "center" }}>
                In order for WeaUp to accurately track your posture, it needs
                access to your physical activity. We only use this data to
                detect postures.
              </Text>
            </Stack>

            <Button
              title="Continue"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EnableMotionScreen;
