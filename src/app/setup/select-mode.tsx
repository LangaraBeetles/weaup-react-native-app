import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import Image from "@src/components/ui/Image";

import {
  Animated,
  Dimensions,
  Easing,
  EasingFunction,
  PanResponder,
  View as RNView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@root/src/state/useUser";
import { TrackingModeEnum } from "@root/src/interfaces/user.types";
import Icon from "@root/src/components/ui/Icon";

const { height: screenHeight } = Dimensions.get("window");
const centerY = screenHeight / 2;

//TODO: handle back button to reset the animmations

const SelectModeScreen = () => {
  const setPreferredMode = useUser((state) => state.setPreferredMode);
  const mode = useRef<"phone" | "earbuds" | null>(null);
  const panEarbuds = useRef(new Animated.ValueXY()).current;
  const panPhone = useRef(new Animated.ValueXY()).current;

  const earbudsArea = useRef<RNView>(null);
  const phoneArea = useRef<RNView>(null);
  const steady = useRef<RNView>(null);

  const earbudsAreaOpacity = new Animated.Value(1);
  const phoneAreaOpacity = new Animated.Value(1);
  const steadyOpacity = new Animated.Value(1);

  const panEarbudsResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        reset();
      },
      onPanResponderMove: (...args) => {
        Animated.event([null, { dy: panEarbuds.y }], {
          useNativeDriver: false,
        })(...args);
      },

      onPanResponderRelease: () => {
        checkOverlap();
        Animated.spring(panEarbuds, {
          toValue: 0,
          useNativeDriver: false,
          friction: 5, // Controls the "bounciness"/damping of the spring animation
          tension: 40, // Controls the speed of the spring animation
        }).start();
      },
    }),
  ).current;

  const panPhoneResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        reset();
      },
      onPanResponderMove: (...args) => {
        Animated.event([null, { dy: panPhone.y }], {
          useNativeDriver: false,
        })(...args);
      },

      onPanResponderRelease: () => {
        checkOverlap();
        Animated.spring(panPhone, {
          toValue: 0,
          useNativeDriver: false,
          friction: 5, // Controls the "bounciness"/damping of the spring animation
          tension: 40, // Controls the speed of the spring animation
        }).start();
      },
    }),
  ).current;

  const measureLayout = (
    ref: React.RefObject<RNView>,
    callback: (layout: any) => void,
  ) => {
    if (ref.current) {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        callback({ x, y, width, height, pageX, pageY });
      });
    }
  };

  const checkOverlap = () => {
    if (!!mode.current) {
      return;
    }
    measureLayout(earbudsArea, (earbudsContainer) => {
      const overlap = earbudsContainer.pageY > centerY / 8;

      if (overlap) {
        mode.current = "earbuds";
        setPreferredMode(TrackingModeEnum.earbuds);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        animateHeadphoneSelected(Easing.exp);
      }
    });

    measureLayout(phoneArea, (phoneContainer) => {
      const overlap = phoneContainer.pageY < centerY;

      if (overlap) {
        mode.current = "phone";
        setPreferredMode(TrackingModeEnum.phone);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        animatePhoneSelected(Easing.exp);
      }
    });
  };

  const animateHeadphoneSelected = (easing: EasingFunction) => {
    // Hide the phone area
    Animated.timing(phoneAreaOpacity, {
      toValue: 0,
      duration: 300,
      easing,
      useNativeDriver: false,
    }).start();

    // // Hide the steady component
    Animated.timing(steadyOpacity, {
      toValue: 0,
      duration: 300,
      easing,
      useNativeDriver: false,
    }).start();

    // Center the earbuds area
    Animated.timing(panEarbuds.y, {
      toValue: centerY,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      //TODO: Go to Earbuds mode onboarding
    });
  };

  const animatePhoneSelected = (easing: EasingFunction) => {
    // Hide the earbuds area
    Animated.timing(earbudsAreaOpacity, {
      toValue: 0,
      duration: 300,
      easing,
      useNativeDriver: false,
    }).start();

    // Hide the steady component
    Animated.timing(steadyOpacity, {
      toValue: 0,
      duration: 300,
      easing,
      useNativeDriver: false,
    }).start();

    // Center the phone area
    Animated.timing(panPhone.y, {
      toValue: centerY - screenHeight,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      //TODO: Go to Phone mode onboarding
    });
  };

  const onDragSelection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const reset = () => {
    if (!!mode.current) {
      mode.current = null;
      earbudsAreaOpacity.setValue(1);
      phoneAreaOpacity.setValue(1);
      steadyOpacity.setValue(1);
    }
  };

  return (
    <SafeAreaView>
      <Center justifyContent="center" height="100%" p={0}>
        <Stack
          gap={22}
          h="100%"
          w="100%"
          justifyContent="space-between"
          backgroundColor={theme.colors.primary[300]}
        >
          <Animated.View
            ref={earbudsArea}
            style={{
              flex: 2,
              opacity: earbudsAreaOpacity,
              transform: [{ translateY: panEarbuds.y }],
              justifyContent: "flex-end",
              zIndex: 1,
            }}
            {...panEarbudsResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={onDragSelection}
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
                  bottom: "3%",
                }}
              >
                <Image name="weasel-earbuds" width={"100%"} height={"85%"} />
                <Text
                  level="title_3"
                  style={{
                    color: theme.colors.neutral[900],
                    paddingVertical: 4,
                    paddingHorizontal: 16,
                    backgroundColor: theme.colors.white,
                    borderRadius: 8,
                    top: "-10%",
                  }}
                >
                  Earbuds Mode
                </Text>
                <Text
                  align="center"
                  level="footnote"
                  style={{
                    color: theme.colors.neutral[600],
                    width: "70%",
                    top: "-8%",
                  }}
                >
                  Use earbuds (AirPods 3 / Pro / Max) to track posture
                </Text>
                <Icon name="double-chevron-down" />
              </Center>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            ref={steady}
            style={{
              opacity: steadyOpacity,
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
          </Animated.View>

          <Animated.View
            ref={phoneArea}
            style={{
              flex: 2,
              opacity: phoneAreaOpacity,
              transform: [{ translateY: panPhone.y }],
            }}
            {...panPhoneResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={onDragSelection}
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
                <Icon name="double-chevron-up" />
                <Image name="weasel-phone" width={"100%"} height={"95%"} />
                <Text
                  level="title_3"
                  style={{
                    color: theme.colors.neutral[900],
                    paddingVertical: 4,
                    paddingHorizontal: 16,
                    backgroundColor: theme.colors.white,
                    borderRadius: 8,
                    top: "-16%",
                  }}
                >
                  Phone Mode
                </Text>
                <Text
                  align="center"
                  level="footnote"
                  style={{
                    color: theme.colors.neutral[600],
                    width: "70%",
                    top: "-8%",
                  }}
                >
                  Use the motion sensors in your mobile phone to track posture
                </Text>
              </Center>
            </TouchableOpacity>
          </Animated.View>
        </Stack>
      </Center>
    </SafeAreaView>
  );
};

export default SelectModeScreen;
