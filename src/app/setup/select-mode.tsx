import Main from "@src/components/layout/Main";
import { router } from "expo-router";
import { SetupStagesType } from "@src/interfaces/setup.types";
import { useRef } from "react";
import * as Haptics from "expo-haptics";
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  View as RNView,
  EasingFunction,
  Easing,
  SafeAreaView,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");
const centerY = screenHeight / 2;

//TODO: handle back button to reset the animmations

const SelectModeScreen: React.FC<{
  setStage: (stage: SetupStagesType) => void;
}> = () => {
  const mode = useRef<"phone" | "headphones" | null>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const heaphonesArea = useRef<RNView>(null);
  const phoneArea = useRef<RNView>(null);
  const draggable = useRef<RNView>(null);

  let headhonesAreaOpacity = new Animated.Value(1);
  let phoneAreaOpacity = new Animated.Value(1);
  let draggableOppacity = new Animated.Value(1);

  const heaphonesAreaTranslateY = useRef(new Animated.Value(0)).current;
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
    })
  ).current;

  const measureLayout = (
    ref: React.RefObject<RNView>,
    callback: (layout: any) => void
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
      measureLayout(heaphonesArea, (headphonesContainer) => {
        const isOverlappingHeadphones = (moving: any, steady: any) => {
          return moving.pageY < steady.pageY;
        };
        const overlap = isOverlappingHeadphones(
          draggableContainer,
          headphonesContainer
        );

        if (overlap) {
          mode.current = "headphones";
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

    // Center the headphones area
    Animated.timing(heaphonesAreaTranslateY, {
      toValue: centerY - 100,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        router.push("/setup/headphones-training");
      }, 500);
    });
  };

  const animatePhoneSelected = (easing: EasingFunction) => {
    // Hide the headphones area
    Animated.timing(headhonesAreaOpacity, {
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
      setTimeout(() => {
        router.push("/setup/phone-training");
      }, 500);
    });
  };

  const next = () => {
    setTimeout(() => {
      if (mode.current === "phone") {
        router.push("/setup/phone-training");
      } else {
        router.replace("/setup/headphones-training");
      }
    }, 500);
  };

  const onDragSelection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <SafeAreaView>
      <Main>
        {/* <Center justifyContent="center" height="100%" paddingHorizontal={2}>
          <VStack gap={80}>
            <Animated.View
              ref={heaphonesArea}
              style={{
                opacity: headhonesAreaOpacity,
                transform: [{ translateY: heaphonesAreaTranslateY }],
              }}
            >
              <VStack gap={16}>
                <Text textAlign="center">Earbuds Mode</Text>
                <Text textAlign="center">
                  WeaUp supports AirPods 3 / Pro / Max / Beats Fit Pro / Google
                  Pixel Buds
                </Text>
              </VStack>
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
                <Text textAlign="center">Drag to enter</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              ref={phoneArea}
              style={{
                opacity: phoneAreaOpacity,
                transform: [{ translateY: phoneAreaTranslateY }],
              }}
            >
              <VStack gap={16}>
                <Text textAlign="center">Phone-only Mode</Text>
                <Text textAlign="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </Text>
              </VStack>
            </Animated.View>
          </VStack>
        </Center> */}
      </Main>
    </SafeAreaView>
  );
};

export default SelectModeScreen;
