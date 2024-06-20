import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const HeadphonesTrainingScreen = () => {
  const next = () => {
    router.push("/setup/enable-notifications");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text style={{ textAlign: "center" }}>
                Sit or stand up straight
              </Text>
              <Text style={{ textAlign: "center" }}>
                WeaUp detects your posture by sensing the movement of your
                earbuds. Keep your head aligned and upright.
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

export default HeadphonesTrainingScreen;
