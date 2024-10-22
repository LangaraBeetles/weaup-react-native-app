import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Center from "@src/components/ui/Center";
import Icon from "@src/components/ui/Icon";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const SetupPages = () => {
  const [checked, setChecked] = useState<boolean>(true);

  const next = () => {
    router.push("/setup/select-mode");
  };

  const login = () => {
    router.navigate("/signin");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Gradient
        color1={theme.colors.primary[300]}
        color2={theme.colors.white}
        locations={[0, 0.7]}
      />
      <Center
        w={236}
        h={464}
        style={{
          marginHorizontal: "auto",
          marginTop: height * 0.2,
        }}
      >
        <Stack style={style.iconStackTop}>
          <Icon name="colorLabelIcon-target" size={80} />
          <Icon name="colorLabelIcon-streak" size={80} />
        </Stack>
        <Stack style={style.iconStackBottom}>
          <Icon name="colorLabelIcon-award" size={80} />
          <Icon name="colorLabelIcon-lightening" size={80} />
        </Stack>
        <Image name="weasel-happy" />
      </Center>

      <View style={style.mainContainer}>
        <Stack w={width} pt={40} px={width * 0.05}>
          <Stack gap={height * 0.05}>
            <Stack gap={1}>
              <Text
                align="center"
                level="title_1"
                style={{ color: theme.colors.primary[900] }}
              >
                Welcome to WeaUp
              </Text>

              <Text
                level="body"
                align="center"
                style={{ color: theme.colors.neutral[500] }}
              >
                Let the cute weasel help you stay upright!
              </Text>
            </Stack>

            <Stack gap={16}>
              <Button
                title="Start the Journey"
                onPress={next}
                variant="primary"
                disabled={!checked}
              />

              <Button
                title="Log in"
                onPress={login}
                variant="secondary"
                disabled={!checked}
              />
            </Stack>

            <Stack flexDirection="row" gap={12} px={6}>
              <Stack pt={2}>
                <Pressable
                  onPress={() => setChecked((prev) => !prev)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    height: 20,
                    width: 20,
                    backgroundColor: theme.colors.secondary[50],
                    borderColor: theme.colors.secondary[500],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {checked && (
                    <Icon
                      name="check"
                      color={theme.colors.secondary[500]}
                      size={12}
                    />
                  )}
                </Pressable>
              </Stack>
              <Stack w={width * 0.75}>
                <Pressable onPress={() => setChecked((prev) => !prev)}>
                  <Text level="caption_1">
                    I have read and agree to the Terms of Service and Privacy
                    Policy.
                  </Text>
                </Pressable>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: height * 0.5,
    width: 865,
    height: 865,
    backgroundColor: theme.colors.white,
    borderRadius: 865 / 2,
    flexShrink: 0,
    alignItems: "center",
  },
  iconStackTop: {
    position: "absolute",
    top: -height * 0.13,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.5,
  },
  iconStackBottom: {
    position: "absolute",
    top: -height * 0.03,
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.9,
  },
});

export default SetupPages;
