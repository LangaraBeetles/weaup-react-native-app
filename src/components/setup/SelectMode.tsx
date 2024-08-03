import { Dimensions, View } from "react-native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
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
  const earbudsTextOpacity = useSharedValue(1);

  const phoneContainerOpacity = useSharedValue(1);
  const phoneContainerY = useSharedValue(0);
  const phoneWeaselY = useSharedValue(0);
  const phoneYellowScale = useSharedValue(1);
  const phoneYellowOpacity = useSharedValue(1);
  const phoneTextOpacity = useSharedValue(1);

  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const clamp = (value: number, min: number, max: number) => {
    "worklet";
    return Math.min(Math.max(value, min), max);
  };

  //gesture for earbuds mode
  const onEarbudsDrag = Gesture.Pan()
    .onChange((event) => {
      earbudsContainerY.value = clamp(event.translationY, 0, centerY);
      phoneContainerOpacity.value = withTiming(0);
    })
    .onFinalize(() => {
      if (earbudsContainerY.value < centerY) {
        earbudsContainerY.value = withSpring(0, { stiffness: 50 });
        earbudsWeaselY.value = withSpring(0, { stiffness: 50 });
        earbudsYellowScale.value = withSpring(1, { stiffness: 100 });
        earbudsYellowOpacity.value = withTiming(1);
        earbudsTextOpacity.value = withTiming(1);
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
      opacity: earbudsYellowOpacity.value,
      transform: [
        {
          scale: interpolate(earbudsContainerY.value, [0, 100], [1, 2]),
        },
      ],
    };
  });

  const earbudsTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        earbudsContainerY.value,
        [100, 0], // Input range (e.g., yValue range from 0 to 100)
        [1, 2], // Output range (scale from 1 to 2)
      ),
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
      opacity: phoneYellowOpacity.value,
      transform: [
        {
          scale: interpolate(phoneContainerY.value, [-100, 100], [0, 2]),
        },
      ],
    };
  });

  const phoneTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        phoneContainerY.value,
        [-100, 100], // Input range (e.g., yValue range from 0 to 100)
        [1, 2], // Output range (scale from 1 to 2)
      ),
    };
  });

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
                    <Icon name="double-chevron-down" style={{ bottom: "3%" }} />
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
                  <Icon name="double-chevron-up" style={{ top: "3%" }} />

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
