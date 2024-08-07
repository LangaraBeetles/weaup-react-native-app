import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Image as RNImage,
} from "react-native";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { theme } from "@root/src/styles/theme";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Image from "../ui/Image";
import Gradient from "../ui/Gradient";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

type StartProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  setBackGround: React.Dispatch<React.SetStateAction<string>>;
};

const Start: React.FC<StartProps> = ({ changePage, setBackGround }) => {
  const [checked, setChecked] = useState(true);

  const fadeOut = useSharedValue(1);
  const fadeInSunshine = useSharedValue(0);
  const fadeInStartSetup = useSharedValue(0);
  const fadeInHelloWally = useSharedValue(0);
  const fadeInMain = useSharedValue(0);

  useEffect(() => {
    fadeInMain.value = withDelay(
      100,
      withTiming(1, { duration: 500 }, () => {
        fadeInSunshine.value = withDelay(
          200,
          withTiming(1, { duration: 500 }, () => {
            fadeInHelloWally.value = withDelay(
              300,
              withTiming(1, { duration: 500 }, () => {
                fadeInStartSetup.value = withDelay(
                  400,
                  withTiming(1, { duration: 500 }),
                );
              }),
            );
          }),
        );
      }),
    );
    setBackGround(theme.colors.other[300]);
  }, [fadeInMain, fadeInSunshine, fadeInStartSetup, fadeInHelloWally]);

  const next = () => {
    fadeOut.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(changePage)("selectMode");
    });
  };

  const login = () => {
    router.navigate("/signin");
  };

  const mainStyle = useAnimatedStyle(() => ({
    opacity: fadeOut.value,
  }));

  const sunshineStyle = useAnimatedStyle(() => ({
    opacity: fadeInSunshine.value,
  }));

  const startSetupStyle = useAnimatedStyle(() => ({
    opacity: fadeInStartSetup.value,
  }));

  const helloWallyStyle = useAnimatedStyle(() => ({
    opacity: fadeInHelloWally.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: fadeInMain.value,
  }));

  return (
    <Animated.View style={[{ flex: 1 }, mainStyle]}>
      <Stack style={{ flex: 1, alignItems: "center" }}>
        <Gradient
          color1={theme.colors.other[200]}
          color2={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
          }}
        />
        <Stack
          w={"100%"}
          h={"50%"}
          alignItems="center"
          style={{ position: "relative" }}
        >
          <Animated.View style={[sunshineStyle, { position: "absolute" }]}>
            <Stack h={height * 0.5} w={822}>
              <Image name="sunshine" />
            </Stack>
          </Animated.View>
          <Animated.View
            style={[
              startSetupStyle,
              { position: "absolute", top: height * 0.05 },
            ]}
          >
            <Stack h={300} w={width}>
              <Image name="start-setup" />
              <RNImage
                source={require("../../../assets/img/badge-start.png")}
                style={{
                  width: 136,
                  height: 131,
                  bottom: 160,
                  left: width * 0.58,
                }}
              />
            </Stack>
          </Animated.View>
          <Animated.View
            style={[
              helloWallyStyle,
              { position: "absolute", top: height * 0.15 },
            ]}
          >
            <Stack h={295} w={252}>
              <Image name="hello-wally" />
            </Stack>
          </Animated.View>
        </Stack>

        <Animated.View style={[style.mainContainer, contentStyle]}>
          <Stack w={width} pt={height * 0.1} px={width * 0.05}>
            <Stack gap={height * 0.05}>
              <Stack gap={8}>
                <Text
                  align="center"
                  level="title_1"
                  style={{ color: theme.colors.primary[900] }}
                >
                  Welcome to WeaUp
                </Text>

                <Stack w={width * 0.75} m={"auto"}>
                  <Text
                    level="body"
                    align="center"
                    style={{ color: theme.colors.neutral[500] }}
                  >
                    Your posture correction assistant that helps you cultivate
                    better posture habits.
                  </Text>
                </Stack>
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
        </Animated.View>
      </Stack>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: height * 0.4,
    width: 865,
    height: 865,
    backgroundColor: theme.colors.white,
    borderRadius: 865 / 2,
    flexShrink: 0,
    alignItems: "center",
  },
});

export default Start;
