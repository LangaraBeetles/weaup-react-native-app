import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const HeadphonesTrainingScreen = () => {
  const next = () => {
    router.push("/setup/enable-notifications");
  };

  return (
    <SafeAreaView>
      <Main>
        {/* <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <View height="40%" />
          <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Sit or stand up straight</Text>
              <Text textAlign="center">
                WeaUp detects your posture by sensing the movement of your
                earbuds. Keep your head aligned and upright.
              </Text>
            </VStack>

            <Button title="Continue" onPress={next} type={{type: "primary", size:"l"}}/>
          </VStack>
        </Center> */}
      </Main>
    </SafeAreaView>
  );
};

export default HeadphonesTrainingScreen;
