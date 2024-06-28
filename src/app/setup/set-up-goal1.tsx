import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";
import PaginationDot from "react-native-animated-pagination-dot";

const SetUpGoalScreen3 = () => {
  const next = () => {
    router.push("/setup/set-up-goal2");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Gain Your Daily Progress with Weabo
              </Text>
              <Text align="center">
                Gain daily progress by improving your posture score and
                finishing sessions with your posture pal Weabo.
              </Text>
            </Stack>
            <Button
              title="Continue"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />
          </Stack>
          <Center>
            <PaginationDot activeDotColor={"black"} curPage={0} maxPage={2} />
          </Center>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen3;
