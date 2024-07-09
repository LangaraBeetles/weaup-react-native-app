import Main from "@src/components/layout/Main";
import Center from "@src/components/ui/Center";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { SetupStagesType } from "@src/interfaces/setup.types";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useRef } from "react";
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
          return moving.pageY < steady.pageY;
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
      toValue: centerY - 100,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      if (!transitioning.current) {
        setTimeout(() => {
          transitioning.current = true;
          router.push("/setup/earbuds-mode-confirmation");
        }, 500);
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
      toValue: centerY - 500,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      if (!transitioning.current) {
        setTimeout(() => {
          transitioning.current = true;
          router.push("/setup/phone-mode-confirmation");
        }, 500);
      }
    });
  };

  const onDragSelection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <SafeAreaView>
      <Main>
        <Center justifyContent="center" height="100%" px={2}>
          <Spacer height="35%" />

          <Stack gap={50}>
            <Animated.View
              ref={earbudsArea}
              style={{
                opacity: earbudsAreaOpacity,
                transform: [{ translateY: earbudsAreaTranslateY }],
              }}
            >
              <Stack gap={16}>
                <Text align="center" level="title_2">
                  Earbuds Mode
                </Text>
                <Text align="center">
                  WeaUp supports AirPods 3 / Pro / Max / Beats Fit Pro / Google
                  Pixel Buds
                </Text>
              </Stack>
            </Animated.View>

            <Animated.View
              ref={draggable}
              style={{
                transform: [{ translateY: pan.y }],
                opacity: draggableOppacity,
              }}
              {...panResponder.panHandlers}
            >
              <TouchableOpacity
                onPress={onDragSelection}
                style={{ paddingVertical: 30 }}
              >
                <Text align="center">Drag to enter</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              ref={phoneArea}
              style={{
                opacity: phoneAreaOpacity,
                transform: [{ translateY: phoneAreaTranslateY }],
              }}
            >
              <Stack gap={16}>
                <Text align="center" level="title_2">
                  Phone-only Mode
                </Text>
                <Text align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </Text>
              </Stack>
            </Animated.View>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SelectModeScreen;
