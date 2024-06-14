import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const EnableMotionScreen = () => {
  const next = () => {
    router.replace("/setup/select-mode");
  };

  return (
    <SafeAreaView>
      <Main>
        {/* <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <View height="40%" />
          <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Enable Motion & Fitness</Text>
              <Text textAlign="center">
                In order for WeaUp to accurately track your posture, it needs
                access to your physical activity. We only use this data to
                detect postures.
              </Text>
            </VStack>

            <Button title="Continue" onPress={next} type={{type: "primary", size:"l"}}/>
          </VStack>
        </Center> */}
      </Main>
    </SafeAreaView>
  );
};

export default EnableMotionScreen;
