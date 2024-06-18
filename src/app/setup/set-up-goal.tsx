import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import { useUser } from "@src/state/useUser";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const SetUpGoalScreen = () => {
  const completeSetup = useUser((state) => state.completeSetup);

  const next = () => {
    completeSetup();
    router.navigate("/");
  };

  return (
    <SafeAreaView>
      <Main>
        {/* <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <View height="40%" />
          <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Set your daily goal</Text>
              <Text textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </VStack>

            <Button title="I’m all set" onPress={next} type={{type: "primary", size:"l"}}/>
          </VStack>
        </Center> */}
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen;
