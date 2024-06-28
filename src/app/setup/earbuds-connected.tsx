import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView, View } from "react-native";

const EarbudsConnectedScreen = () => {
  const next = () => {
    router.replace("/setup/earbuds-training1");
  };

  return (
    <SafeAreaView>
      <Main>
        <Spacer height="4%" />

        <View
          style={{
            justifyContent: "center",
            height: "100%",
            paddingHorizontal: 2,
          }}
        >
          <View style={{ height: "35%" }} />
          <Stack gap={80}>
            <Stack gap={16}>
              <Text align="center" level="title_2">
                You’ve connected!
              </Text>

              <Text align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </Text>
            </Stack>

            <Button
              title="Continue"
              onPress={next}
              type={{ type: "primary", size: "l" }}
            />
          </Stack>
        </View>
      </Main>
    </SafeAreaView>
  );
};

export default EarbudsConnectedScreen;
