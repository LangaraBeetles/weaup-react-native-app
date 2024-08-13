import { useUser } from "@src/state/useUser";
import { theme } from "@src/styles/theme";
import React, { useEffect, useState } from "react";
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
import LottieView from "lottie-react-native";
import { PostureStatus } from "@root/src/interfaces/posture.types";

const { height, width } = Dimensions.get("screen");

const imageSize = width * 0.7;

const SessionBackground = () => {
  const currentPosture = useUser((state) => state.currentPosture);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const isSessionActive = sessionStatus === "ACTIVE";
  const showGlow = isSessionActive && currentPosture !== "not_reading";
  const goodPostureOpacity = useSharedValue<number>(1);
  const badPostureOpacity = useSharedValue<number>(0);
  const shadowRadius = useSharedValue<number>(10);

  useEffect(() => {
    if (
      (currentPosture === "good" || currentPosture === "not_reading") &&
      isSessionActive
    ) {
      goodPostureOpacity.value = withTiming(1);
      badPostureOpacity.value = withTiming(0, { duration: 500 });
    }

    if (currentPosture === "bad" && isSessionActive) {
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
          top: (height - imageSize) * 0.35,
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

          <ActiveMonitoringAnimation
            posture={isSessionActive ? currentPosture : "not_reading"}
          />
        </Stack>
      </Animated.View>
      <Animated.View
        style={{
          opacity: badPostureOpacity,
          position: "absolute",
          top: (height - imageSize) * 0.35,
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

          <ActiveMonitoringAnimation
            posture={isSessionActive ? currentPosture : "not_reading"}
          />
        </Stack>
      </Animated.View>
    </Stack>
  );
};

const ActiveMonitoringAnimation = ({ posture }: { posture: PostureStatus }) => {
  const [status, setStatus] = useState<PostureStatus>(posture);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let downtimer = null;
    let uptimer = null;

    if (posture === "bad") {
      setStatus(posture);

      downtimer = setTimeout(() => {
        setProgress((prev) => {
          const value = prev + 0.1;
          if (value > 1) {
            return 1;
          }
          return Number(value.toFixed(5));
        });
      }, 50);
    }

    if (posture === "good") {
      setStatus(posture);

      uptimer = setTimeout(() => {
        setProgress((prev) => {
          const value = prev - 0.1;
          if (value < 0) {
            return 0;
          }
          return Number(value.toFixed(5));
        });
      }, 50);
    }

    if (posture === "not_reading" && posture !== status) {
      setProgress(0);
      setStatus(posture);
    }

    return () => {
      downtimer && clearTimeout(downtimer);
      uptimer && clearTimeout(uptimer);
    };
  }, [posture, progress]);

  return (
    <Center style={{ position: "relative" }}>
      <LottieView
        progress={progress}
        speed={0.5}
        autoPlay={false}
        style={{
          width: width * 1.5,
          height: width * 1.1,
          top: 0,
        }}
        source={require("../../animations/weasel_session.json")}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  backgroundImageFill: {
    flex: 1,
    transform: [{ scale: 2 }, { translateY: 10 }],
  },
});

export default SessionBackground;
