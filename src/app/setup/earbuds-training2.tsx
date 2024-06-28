import Main from "@src/components/layout/Main";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView, Pressable } from "react-native";
import { Text } from "@src/components/ui/typography";
import PaginationDot from "react-native-animated-pagination-dot";

const EarbudsTrainingScreen2 = () => {
  const next = () => {
    router.push("/setup/earbuds-training3");
  };

  return (
    <SafeAreaView>
      <Main>
        <Spacer height="4%" />
        <Pressable onPress={next}>
          <Text
            align="right"
            level="body"
            weight="medium"
            style={{ textDecorationLine: "underline" }}
          >
            Skip
          </Text>
        </Pressable>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                Now, try drop your head
              </Text>
              <Text align="center">
                Notice the alerts or vibrations? WeaUp uses the movement of your
                earbuds to remind you to correct your posture.
              </Text>
            </Stack>
            <Center>
              <PaginationDot activeDotColor={"black"} curPage={1} maxPage={3} />
            </Center>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EarbudsTrainingScreen2;
