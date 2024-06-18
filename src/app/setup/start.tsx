import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

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
          <Stack gap={80}>
            <Stack gap={16}>
              <Text style={{ textAlign: "center" }}>Welcome to WeaUp</Text>
              <Text style={{ textAlign: "center" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </Stack>

            <Button
              title="Start the Journey"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />

            <Text>I have read and agree Agreement and Privacy.</Text>
          </Stack>
        </View>
      </Main>
    </SafeAreaView>
  );
};

export default SetupPages;
