import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import useAuth from "@src/components/hooks/useAuth";
import { useUser } from "@src/state/useUser";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const SetUpGoalScreen = () => {
  const isAuth = useUser((data) => data.isAuth);
  const { createGuestUser } = useAuth();

  const next = () => {
    if (!isAuth) {
      createGuestUser().then(() => {
        router.navigate("/");
      });
    } else {
      router.navigate("/");
    }
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="60%" />

          <Stack gap={80}>
            <Stack gap={16}>
              <Text style={{ textAlign: "center" }}>Set your daily goal</Text>
              <Text style={{ textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </Stack>

            <Button
              title="I’m all set"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen;
