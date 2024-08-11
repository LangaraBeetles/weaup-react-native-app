import { Dimensions, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import { useUser } from "@root/src/state/useUser";
import { TrackingModeEnum } from "@root/src/interfaces/user.types";
import Icon from "@root/src/components/ui/Icon";
import { useEffect } from "react";

const { height: screenHeight } = Dimensions.get("window");
const centerY = screenHeight / 2;

type SelectModeProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

const SelectMode: React.FC<SelectModeProps> = ({ changePage }) => {
  const setPreferredMode = useUser((state) => state.setPreferredMode);
  const { height } = Dimensions.get("screen");

  const earbudsContainerOpacity = useSharedValue(1);
  const earbudsContainerY = useSharedValue(0);
  const earbudsWeaselY = useSharedValue(0);
  const earbudsYellowScale = useSharedValue(1);
  const earbudsYellowOpacity = useSharedValue(1);
  const yellowCardY = useSharedValue(0);
  const earbudsTextOpacity = useSharedValue(1);

  const phoneContainerOpacity = useSharedValue(1);
  const phoneContainerY = useSharedValue(0);
  const phoneWeaselY = useSharedValue(0);
  const phoneYellowScale = useSharedValue(1);
  const phoneYellowOpacity = useSharedValue(1);
  const phoneTextOpacity = useSharedValue(1);
  const chevronOpacity = useSharedValue(0);
  const duration = 1000;

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  const clampEarbudsWeasel = (value: number, min: number, max: number) => {
    "worklet";

    if (value > max / 2) {
      if (max - value <= max * -1) {
        return max * -1;
      }
      return max - value;
    }
    return Math.min(Math.max(value, min), max);
  };

  const clampPhoneWeasel = (value: number, min: number, max: number) => {
    "worklet";

    if (min / 2 > value) {
      if (min - value >= min * -1) {
        return min * -1;
      }
      return min - value;
    }
    return Math.min(Math.max(value, min), max);
  };

  //gesture for earbuds mode
  const onEarbudsDrag = Gesture.Pan()
    .onChange((event) => {
      earbudsWeaselY.value = clampEarbudsWeasel(
        event.translationY,
        0,
        centerY / 2,
      );
      yellowCardY.value = event.translationY * 1.5;
      earbudsContainerY.value = clamp(event.translationY, 0, centerY);
      phoneContainerOpacity.value = withTiming(0);
    })
    .onFinalize(() => {
      if (earbudsContainerY.value < centerY) {
        earbudsContainerY.value = withTiming(0);
        earbudsWeaselY.value = withTiming(0);
        yellowCardY.value = withTiming(0);
        earbudsYellowScale.value = withTiming(0);
        earbudsYellowOpacity.value = withTiming(1);
        earbudsTextOpacity.value = withTiming(1); // withSpring(1,  { stiffness: 100 });
        phoneContainerOpacity.value = withTiming(1, { duration: 1000 });
      } else {
        earbudsYellowScale.value = withTiming(10, { duration: 500 });
        earbudsTextOpacity.value = withTiming(0, { duration: 500 });
        phoneContainerOpacity.value = withTiming(0, { duration: 800 });
        earbudsYellowOpacity.value = withTiming(0, { duration: 800 });
        earbudsWeaselY.value = withTiming(-centerY * 1.75, { duration: 1000 });
        earbudsContainerY.value = withTiming(
          height,
          { duration: 1000 },
          (isFinished) => {
            if (isFinished) {
              runOnJS(setPreferredMode)(TrackingModeEnum.earbuds);
              runOnJS(changePage)("earbudsTraining");
            }
          },
        );
      }
    });

  //gesture for phone mode
  const onPhoneDrag = Gesture.Pan()
    .onChange((event) => {
      phoneWeaselY.value = clampPhoneWeasel(
        event.translationY,
        -centerY / 2,
        0,
      );
      phoneContainerY.value = clamp(event.translationY, -centerY, 0);
      earbudsContainerOpacity.value = withTiming(0);
    })
    .onFinalize(() => {
      if (phoneContainerY.value > -centerY) {
        phoneContainerY.value = withSpring(0, { stiffness: 50 });
        phoneWeaselY.value = withSpring(0, { stiffness: 50 });
        phoneYellowScale.value = withSpring(1, { stiffness: 100 });
        phoneYellowOpacity.value = withTiming(1);
        phoneTextOpacity.value = withTiming(1);
        earbudsContainerOpacity.value = withTiming(1, { duration: 1000 });
      } else {
        phoneYellowScale.value = withTiming(10, { duration: 500 });
        phoneTextOpacity.value = withTiming(0, { duration: 500 });
        earbudsContainerOpacity.value = withTiming(0, { duration: 800 });
        phoneYellowOpacity.value = withTiming(0, { duration: 800 });
        phoneWeaselY.value = withTiming(centerY * 1.75, { duration: 1000 });
        phoneContainerY.value = withTiming(
          -height,
          { duration: 1000 },
          (isFinished) => {
            if (isFinished) {
              runOnJS(setPreferredMode)(TrackingModeEnum.phone);
              runOnJS(changePage)("notifications");
            }
          },
        );
      }
    });

  const earbudsContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: earbudsContainerOpacity.value,
      transform: [
        {
          translateY: withSpring(earbudsContainerY.value),
        },
      ],
    };
  });

  const yellowCardStyle = useAnimatedStyle(() => {
    return {
      opacity: earbudsContainerOpacity.value,
      transform: [
        {
          translateY: withTiming(yellowCardY.value * 1.5, { duration: 50 }),
        },
      ],
    };
  });

  const earbudsWeaselStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(earbudsWeaselY.value),
        },
      ],
    };
  });

  const earbudsYellowStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(earbudsContainerY.value, [100, 0], [1.5, 2]),
      transform: [
        {
          scale: interpolate(earbudsContainerY.value, [0, 50], [1, 2]),
        },
      ],
    };
  });

  const earbudsTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        earbudsContainerY.value,
        [100, 0], // Input range (e.g., yValue range from 0 to 100)
        [0, 1], // Output range (scale from 1 to 2)
      ),
      transform: [
        {
          translateY: withSpring(earbudsWeaselY.value),
        },
      ],
    };
  });

  const phoneContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: phoneContainerOpacity.value,
      transform: [
        {
          translateY: withSpring(phoneContainerY.value),
        },
      ],
    };
  });

  const phoneWeaselStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(phoneWeaselY.value),
        },
      ],
    };
  });

  const phoneYellowStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(phoneContainerY.value, [-200, 0], [1.5, 2]),
      transform: [
        {
          scale: interpolate(phoneContainerY.value, [-50, 0], [2, 1]),
        },
      ],
    };
  });

  const phoneTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        phoneContainerY.value,
        [-50, 0], // Input range (e.g., yValue range from 0 to 100)
        [1, 2], // Output range (scale from 1 to 2)
      ),
      transform: [
        {
          translateY: withSpring(phoneWeaselY.value),
        },
      ],
    };
  });

  const chevronStyle = useAnimatedStyle(() => {
    return {
      opacity: chevronOpacity.value,
    };
  });

  useEffect(() => {
    chevronOpacity.value = withRepeat(withTiming(1, { duration }), -1, true);
  }, []);

  return (
    <View>
      <Center justifyContent="center" height="100%" p={0}>
        <Stack
          gap={22}
          h="100%"
          w="100%"
          justifyContent="space-between"
          backgroundColor={theme.colors.primary[300]}
        >
          <GestureDetector gesture={onEarbudsDrag}>
            <Animated.View
              style={[
                earbudsContainerStyle,
                {
                  flex: 2,
                  justifyContent: "flex-end",
                  zIndex: 1,
                },
              ]}
            >
              <View
                style={{
                  height: screenHeight * 2,
                  backgroundColor: theme.colors.primary[50],
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Animated.View
                  style={[
                    yellowCardStyle,
                    {
                      width: "100%",
                      height: screenHeight * 2,
                      backgroundColor: theme.colors.primary[50],
                      alignItems: "center",
                      borderRadius: 20,
                    },
                  ]}
                ></Animated.View>
                <Center
                  style={{
                    width: "70%",
                    height: "18%",
                    position: "absolute",
                    bottom: "2%",
                  }}
                >
                  <AnimatedImage
                    name="yellow-circle"
                    width={"100%"}
                    height={"85%"}
                    style={[
                      earbudsYellowStyle,
                      { position: "absolute", top: "-10%" },
                    ]}
                  />
                  <AnimatedImage
                    name="earbuds-weasel"
                    width={"100%"}
                    height={"80%"}
                    style={[earbudsWeaselStyle, { top: "3%" }]}
                  />
                  <Animated.View
                    style={[earbudsTextStyle, { alignItems: "center" }]}
                  >
                    <Stack
                      alignItems="center"
                      gap={12}
                      w={"70%"}
                      style={{ top: "-18%" }}
                    >
                      <Text
                        level="title_3"
                        style={{
                          color: theme.colors.neutral[900],
                          paddingVertical: 4,
                          paddingHorizontal: 16,
                          backgroundColor: theme.colors.white,
                          borderRadius: 8,
                        }}
                      >
                        Earbuds Mode
                      </Text>
                      <Text
                        align="center"
                        level="footnote"
                        style={{
                          color: theme.colors.neutral[600],
                        }}
                      >
                        Use earbuds (AirPods 3 / Pro / Max) to track posture
                      </Text>
                    </Stack>
                    <Animated.View style={[chevronStyle]}>
                      <Icon
                        name="double-chevron-down"
                        style={{ bottom: "3%" }}
                      />
                    </Animated.View>
                  </Animated.View>
                </Center>
              </View>
            </Animated.View>
          </GestureDetector>

          <View
            style={{
              zIndex: -5,
            }}
          >
            <Text
              align="center"
              level="body"
              style={{ color: theme.colors.neutral[950] }}
            >
              Drag card to enter
            </Text>
          </View>

          <GestureDetector gesture={onPhoneDrag}>
            <Animated.View
              style={[
                phoneContainerStyle,
                {
                  flex: 2,
                },
              ]}
            >
              <View
                style={{
                  height: screenHeight * 2,
                  backgroundColor: theme.colors.primary[50],
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Center
                  style={{
                    width: "70%",
                    height: "18%",
                    position: "absolute",
                    top: "3%",
                  }}
                >
                  <Animated.View style={[chevronStyle]}>
                    <Icon name="double-chevron-up" style={{ top: "32%" }} />
                  </Animated.View>

                  <AnimatedImage
                    name="yellow-circle"
                    width={"100%"}
                    height={"85%"}
                    style={[
                      phoneYellowStyle,
                      { position: "absolute", top: "-1%" },
                    ]}
                  />
                  <AnimatedImage
                    name="phone-weasel"
                    width={"100%"}
                    height={"95%"}
                    style={[phoneWeaselStyle, { top: "3%" }]}
                  />
                  <Animated.View style={[phoneTextStyle]}>
                    <Stack
                      alignItems="center"
                      gap={12}
                      w={"70%"}
                      style={{ top: "-40%" }}
                    >
                      <Text
                        level="title_3"
                        style={{
                          color: theme.colors.neutral[900],
                          paddingVertical: 4,
                          paddingHorizontal: 16,
                          backgroundColor: theme.colors.white,
                          borderRadius: 8,
                        }}
                      >
                        Phone Mode
                      </Text>
                      <Text
                        align="center"
                        level="footnote"
                        style={{
                          color: theme.colors.neutral[600],
                        }}
                      >
                        Use the motion sensors in your mobile phone to track
                        posture
                      </Text>
                    </Stack>
                  </Animated.View>
                </Center>
              </View>
            </Animated.View>
          </GestureDetector>
        </Stack>
      </Center>
    </View>
  );
};

export default SelectMode;
