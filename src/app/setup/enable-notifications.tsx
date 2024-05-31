import { Center, SafeAreaView, Text, VStack, View } from "@gluestack-ui/themed";
import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import { router } from "expo-router";

const EnableNotificationsScreen = () => {
  const next = () => {
    router.push("/setup/set-up-goal");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <View height="40%" />
          <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Get Real-time Alerts</Text>
              <Text textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </VStack>

            <Button title="Allow Notification" onPress={next} />
          </VStack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default EnableNotificationsScreen;