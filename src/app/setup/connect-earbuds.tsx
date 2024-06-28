import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView, View, Pressable } from "react-native";

const ConnectEarbudsScreen = () => {
  const next = () => {
    router.push("/setup/earbuds-connected");
  };

  const back = () => {
    router.replace("/setup/select-mode");
  };

  return (
    <SafeAreaView>
      <Main>
        <Spacer height="4%" />

        <Pressable onPress={back}>
          <Text
            align="left"
            level="body"
            weight="medium"
            style={{ textDecorationLine: "underline" }}
          >
            Back
          </Text>
        </Pressable>

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
                Track posture with Earbuds
              </Text>

              <Text align="center">
                In order for WeaUp to successfully connect with you earbuds,
                bluetooth needs to be turned on.
              </Text>

              <Text align="center" style={{ textDecorationLine: "underline" }}>
                Learn How
              </Text>
            </Stack>

            <Button
              title="Connect with earbuds"
              onPress={next}
              variant="primary"
            />
          </Stack>
        </View>
      </Main>
    </SafeAreaView>
  );
};

export default ConnectEarbudsScreen;
