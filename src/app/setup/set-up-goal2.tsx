import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";
import PaginationDot from "react-native-animated-pagination-dot";

const SetUpGoalScreen2 = () => {
  const next = () => {
    router.push("/setup/set-up-goal3");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Achieve you Daily Goal and Level Up
              </Text>
              <Text align="center">
                You can earn XP by achieving your daily score goal and complete
                sessions. Level up and unlock badges and other exciting rewards
                as you progress.
              </Text>
            </Stack>
            <Button title="Continue" onPress={next} variant="primary" />
          </Stack>
          <Center>
            <PaginationDot activeDotColor={"black"} curPage={1} maxPage={2} />
          </Center>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen2;
