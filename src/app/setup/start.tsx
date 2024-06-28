import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { SafeAreaView, View } from "react-native";

const SetupPages = () => {
  const next = () => {
    router.push("/setup/enable-motion");
  };

  const login = () => {
    // router.push("provider-signup");
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
              <Text align="center" level="title_1">
                Welcome to WeaUp
              </Text>

              <Text style={{ textAlign: "center" }}>
                Let the cute weasel help you stay upright!
              </Text>
            </Stack>

            <Stack>
              <Button
                title="Start the Journey"
                onPress={next}
                type={{ type: "primary", size: "l" }}
              />

              <Button
                title="Log in"
                onPress={login}
                type={{ type: "secondary", size: "l" }}
              />
            </Stack>
            <Stack flexDirection="row" gap={5}>
              {/* TODO: Checkbox functionality */}
              <Checkbox />
              <Text>
                I have read and agree to the Terms of Service and Privacy
                Policy.
              </Text>
            </Stack>
          </Stack>
        </View>
      </Main>
    </SafeAreaView>
  );
};

export default SetupPages;
