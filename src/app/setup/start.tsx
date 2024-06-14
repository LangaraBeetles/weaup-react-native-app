import Button from "@src/components/ui/Button";
import Main from "@src/components/layout/Main";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";

const SetupPages = () => {
  const next = () => {
    router.replace("/setup/enable-motion");
  };

  return (
    <SafeAreaView>
      <Main>
        <View
          style={{
            justifyContent: "center",
            height: "100%",
            paddingHorizontal: 2,
          }}
        >
          <View style={{ height: "40%" }} />
          {/* <VStack gap={80}>
            <VStack gap={16}>
              <Text textAlign="center">Welcome to WeaUp</Text>
              <Text textAlign="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </VStack>

            <Button title="Start the Journey" onPress={next} type={{type: "primary", size:"l"}}/>

            <Text>I have read and agree Agreement and Privacy.</Text>
          </VStack> */}
        </View>
      </Main>
    </SafeAreaView>
  );
};

export default SetupPages;
