import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";

const SetUpGoalScreen3 = () => {
  const completeSetup = useUser((state) => state.completeSetup);
  // const setDailyGoal = useUser((state) => state.setDailyGoal);

  const next = () => {
    completeSetup();
    router.navigate("/setup/welcome");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Set your daily goal
              </Text>
              <Spacer height="50%" />
              <Text align="center">
                A score setting of 70–85% of good posture is perfect for
                beginners.
              </Text>
            </Stack>

            <Stack>
              {/* TODO: update button to have icons */}
              <Button
                title="I’m all set"
                onPress={next}
                type={{ type: "primary", size: "l" }}
              />
              <Button
                title="Maybe Later"
                onPress={next}
                type={{ type: "secondary", size: "l" }}
              />
            </Stack>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen3;
