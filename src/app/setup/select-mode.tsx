import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { SetupStagesType } from "@src/interfaces/setup.types";
import { theme } from "@src/styles/theme";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
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

const { height: screenHeight } = Dimensions.get("window");
const centerY = screenHeight / 2;

//TODO: handle back button to reset the animmations

const SelectModeScreen: React.FC<{
  setStage: (stage: SetupStagesType) => void;
}> = () => {
  const mode = useRef<"phone" | "earbuds" | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const earbudsArea = useRef<RNView>(null);
  const phoneArea = useRef<RNView>(null);
  const draggable = useRef<RNView>(null);
  const transitioning = useRef<boolean>(false);

  const earbudsAreaOpacity = new Animated.Value(1);
  const phoneAreaOpacity = new Animated.Value(1);
  const draggableOppacity = new Animated.Value(1);

  const earbudsAreaTranslateY = useRef(new Animated.Value(0)).current;
  const phoneAreaTranslateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (...args) => {
        checkOverlap();
        Animated.event([null, { dy: pan.y }], {
          useNativeDriver: false,
        })(...args);
      },

      onPanResponderRelease: () => {
        Animated.spring(pan, {
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
    measureLayout(draggable, (draggableContainer) => {
      measureLayout(earbudsArea, (earbudsContainer) => {
        const isOverlappingEarbuds = (moving: any, steady: any) => {
          return moving.pageY < steady.pageY + 200;
        };
        const overlap = isOverlappingEarbuds(
          draggableContainer,
          earbudsContainer,
        );

        if (overlap) {
          mode.current = "earbuds";
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          animateHeadphoneSelected(Easing.exp);
        }
      });
    });

    measureLayout(draggable, (draggableContainer) => {
      measureLayout(phoneArea, (phoneContainer) => {
        const isOverlappingPhone = (moving: any, steady: any) => {
          return moving.pageY > steady.pageY;
        };
        const overlap = isOverlappingPhone(draggableContainer, phoneContainer);

        if (overlap) {
          mode.current = "phone";
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          animatePhoneSelected(Easing.exp);
        }
      });
    });
  };

  const animateHeadphoneSelected = (easing: EasingFunction) => {
    // Hide the phone area
    Animated.timing(phoneAreaOpacity, {
      toValue: 0,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();

    // Hide the draggable component
    Animated.timing(draggableOppacity, {
      toValue: 0,
      duration: 200,
      easing,
      useNativeDriver: false,
    }).start();

    // Center the earbuds area
    Animated.timing(earbudsAreaTranslateY, {
      toValue: centerY - 10,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      if (!transitioning.current) {
        setTimeout(() => {
          transitioning.current = true;
          router.push("/setup/earbuds-mode-confirmation");
        }, 300);
      }
    });
  };

  const animatePhoneSelected = (easing: EasingFunction) => {
    // Hide the earbuds area
    Animated.timing(earbudsAreaOpacity, {
      toValue: 0,
      duration: 500,
      easing,
      useNativeDriver: false,
    }).start();

    // Hide the draggable component
    Animated.timing(draggableOppacity, {
      toValue: 0,
      duration: 200,
      easing,
      useNativeDriver: false,
    }).start();

    // Center the phone area
    Animated.timing(phoneAreaTranslateY, {
      toValue: centerY - screenHeight,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      if (!transitioning.current) {
        setTimeout(() => {
          transitioning.current = true;
          router.push("/setup/phone-mode-confirmation");
        }, 300);
      }
    });
  };

  const onDragSelection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <SafeAreaView>
      <Center justifyContent="center" height="100%" p={0}>
        <Stack gap={20} h="100%" justifyContent="space-between">
          <Animated.View
            ref={earbudsArea}
            style={{
              flex: 2,
              opacity: earbudsAreaOpacity,
              transform: [{ translateY: earbudsAreaTranslateY }],
              justifyContent: "flex-end",
              height: screenHeight * 2,
              position: "relative",
            }}
          >
            <LinearGradient
              colors={[
                theme.colors.surface,
                theme.colors.primary[50],
                theme.colors.primary[100],
                theme.colors.primary[200],
              ]}
              locations={[0.4, 0.6, 0.8, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "250%",
                zIndex: -2,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />

            <Center
              style={{
                width: 100,
                height: 150,
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image name="weasel-head-tilt" style={{ zIndex: -1 }} />
            </Center>
            <Stack flexDirection="column" gap={16} px={32} pb={48}>
              <Text
                align="center"
                level="title_2"
                style={{ color: theme.colors.text }}
              >
                Earbuds Mode
              </Text>
              <Text
                align="center"
                level="body"
                style={{ color: theme.colors.neutral[400] }}
              >
                Use earbuds (AirPods 3 / Pro / Max / Beats Fit Pro / Google
                Pixel Buds) to track posture
              </Text>
            </Stack>
          </Animated.View>

          <Animated.View
            ref={draggable}
            style={{
              transform: [{ translateY: pan.y }],
              opacity: draggableOppacity,
              zIndex: 5,
            }}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={onDragSelection}
              style={{ paddingVertical: 30 }}
            >
              <Text
                align="center"
                level="body"
                style={{ color: theme.colors.neutral[950] }}
              >
                Drag to enter
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            ref={phoneArea}
            style={{
              flex: 2,
              opacity: phoneAreaOpacity,
              transform: [{ translateY: phoneAreaTranslateY }],
              height: screenHeight * 2,
            }}
          >
            <LinearGradient
              colors={[
                theme.colors.primary[200],
                theme.colors.primary[100],
                theme.colors.primary[50],
                theme.colors.surface,
              ]}
              locations={[0.1, 0.3, 0.6, 1]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: "250%",
                zIndex: -1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />

            <Stack gap={16} px={32} pt={48} pb={18}>
              <Text align="center" level="title_2">
                Phone Mode
              </Text>
              <Text
                align="center"
                level="body"
                style={{ color: theme.colors.neutral[400] }}
              >
                Use the motion sensors in your mobile phone to track posture
              </Text>
            </Stack>

            <Center
              style={{
                width: 100,
                height: 150,
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image name="weasel-head-tilt" style={{ zIndex: -1 }} />
            </Center>
          </Animated.View>
        </Stack>
      </Center>
      {/* </Main> */}
    </SafeAreaView>
  );
};

export default SelectModeScreen;
