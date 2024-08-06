import { useUser } from "@src/state/useUser";
import { theme } from "@src/styles/theme";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Stack from "@src/components/ui/Stack";
import Image from "@src/components/ui/Image";
import Center from "../ui/Center";
import { LinearGradient as Gradient } from "expo-linear-gradient";

const { height } = Dimensions.get("screen");

const imageSize = 253;

const SessionBackground = () => {
  const currentPosture = useUser((state) => state.currentPosture);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const showGlow =
    sessionStatus === "ACTIVE" && currentPosture !== "not_reading";
  const goodPostureOpacity = useSharedValue<number>(1);
  const badPostureOpacity = useSharedValue<number>(0);
  const shadowRadius = useSharedValue<number>(10);

  useEffect(() => {
    if (
      (currentPosture === "good" || currentPosture === "not_reading") &&
      sessionStatus === "ACTIVE"
    ) {
      goodPostureOpacity.value = withTiming(1);
      badPostureOpacity.value = withTiming(0, { duration: 500 });
    }

    if (currentPosture === "bad" && sessionStatus === "ACTIVE") {
      goodPostureOpacity.value = withTiming(0, { duration: 500 });
      badPostureOpacity.value = withTiming(1);
    }
  }, [currentPosture]);

  React.useEffect(() => {
    shadowRadius.value = withRepeat(
      withSequence(
        withTiming(40, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(10, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(40, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <Stack
      style={{
        position: "relative",
        height: "100%",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      {/* Yellow Gradient */}
      <Gradient
        colors={[theme.colors.primary[400], theme.colors.primary[50]]}
        locations={[0, 0.3]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height,
          zIndex: 10,
        }}
      />
      <Animated.View
        style={{
          opacity: goodPostureOpacity,
          position: "absolute",
          left: 0,
          right: 0,
          top: (height - imageSize) * 0.4,
          shadowColor: theme.colors.random.green,
          shadowRadius: showGlow ? shadowRadius : 0,
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        }}
      >
        <Stack
          mt={18}
          h={imageSize}
          w={imageSize}
          borderColor={theme.colors.white}
          border={12}
          borderRadius={150}
          style={{
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          <Image
            name="background-happy"
            style={[StyleSheet.absoluteFillObject, styles.backgroundImageFill]}
          />
          <Center style={{ marginTop: 25 }}>
            <Image name="weasel-side-peaceful" width={109} height={230} />
          </Center>
        </Stack>
      </Animated.View>
      <Animated.View
        style={{
          opacity: badPostureOpacity,
          position: "absolute",
          top: (height - imageSize) * 0.4,
          left: 0,
          right: 0,
          shadowColor: theme.colors.random.red,
          shadowRadius: showGlow ? shadowRadius : 0,
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        }}
      >
        <Stack
          mt={18}
          h={imageSize}
          w={imageSize}
          borderColor={theme.colors.white}
          border={12}
          borderRadius={150}
          style={{ overflow: "hidden", alignSelf: "center" }}
        >
          <Image
            name="background-bad"
            style={[StyleSheet.absoluteFillObject, styles.backgroundImageFill]}
          />
          <Center style={{ marginTop: 25 }}>
            <Image name="weasel-side-sad" width={130} height={250} />
          </Center>
        </Stack>
      </Animated.View>
    </Stack>
  );
};

const styles = StyleSheet.create({
  backgroundImageFill: {
    flex: 1,
    transform: [{ scale: 2 }, { translateY: 10 }],
  },
});

export default SessionBackground;
