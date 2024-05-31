import { Center, SafeAreaView, Text, VStack, View } from "@gluestack-ui/themed";
import Button from "@src/components/ui/Button";
import Main from "@src/components/layout/Main";
import { router } from "expo-router";

const SetupPages = () => {
  const next = () => {
    router.replace("/setup/enable-motion");
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <View height="40%" />
          <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Welcome to WeaUp</Text>
              <Text textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </VStack>

            <Button title="Start the Journey" onPress={next} />

            <Text>I have read and agree Agreement and Privacy.</Text>
          </VStack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetupPages;
