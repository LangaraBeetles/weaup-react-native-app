import { useUser } from "@src/state/useUser";
import { theme } from "@src/styles/theme";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Svg, { Defs, Stop, Rect, LinearGradient } from "react-native-svg";
import Stack from "@src/components/ui/Stack";
import Image from "@src/components/ui/Image";
import Animated, {
  runOnJS,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { PostureStatus } from "@root/src/interfaces/posture.types";

const { height, width } = Dimensions.get("screen");

const layers = {
  gradient: -3,
  background: -2,
  darkgradient: -1,
  weasel: 0,
};

const RealtimeTrackingBackground = () => {
  const currentPosture = useUser((state) => state.currentPosture);
  // const isActiveMonitoring = useUser((state) => state.isTrackingEnabled);

  const badBackgroundOpacity = useSharedValue<number>(0);

  useEffect(() => {
    if (currentPosture === "good" || currentPosture === "not_reading") {
      badBackgroundOpacity.value = withTiming(0);
    }

    if (currentPosture === "mid") {
      badBackgroundOpacity.value = withTiming(0.3, { duration: 1000 });
    }

    if (currentPosture === "bad") {
      badBackgroundOpacity.value = withTiming(1, { duration: 2000 });
    }
  }, [currentPosture]);

  return (
    <View
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      {/* Yellow Gradient */}
      {/* <Gradient
        colors={[theme.colors.primary[400], theme.colors.primary[50]]}
        locations={[0, 0.3]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height,
          zIndex: layers.gradient,
        }}
      /> */}

      {/* Landscape */}
      <Stack h={height} style={styles.backgroundImage}>
        <View style={{ opacity: 1 }}>
          <Image name="background-happy" />
        </View>
      </Stack>

      {/* Dark Background */}
      <Animated.View
        style={[styles.animatedBackground, { opacity: badBackgroundOpacity }]}
      >
        <Svg height={height} width="100%" style={StyleSheet.absoluteFillObject}>
          <Defs>
            <LinearGradient
              id="background-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <Stop
                offset="0%"
                stopColor={theme.colors.primary[400]}
                stopOpacity={1}
              />

              <Stop
                offset="75%"
                stopColor={theme.colors.neutral[600]}
                stopOpacity={0.5}
              />

              <Stop offset="100%" stopColor={"transparent"} stopOpacity={0.2} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#background-gradient)" />
        </Svg>
      </Animated.View>

      {/* Weasel Animation */}
      <ActiveMonitoringAnimation posture={currentPosture} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: layers.background,
  },
  animatedBackground: {
    zIndex: layers.darkgradient,
    opacity: 1,
    position: "absolute",
    top: 0,
    bottom: 100,
    left: 0,
    right: 0,
  },
});

enum Speed {
  SLOW = 0.1,
  IDLE = 0.3,
  REGULAR = 1,
}

const ActiveMonitoringAnimation = ({ posture }: { posture: PostureStatus }) => {
  const [status, setStatus] = useState<PostureStatus>(posture);
  const animation = useRef<any>(null);
  const [speed, setSpeed] = useState<number>(Speed.IDLE);
  const progress = useSharedValue(0);

  const playIdle = () => {
    try {
      setSpeed(Speed.IDLE);
      animation.current?.play?.(0, 80);
    } catch (error) {}
  };

  const playCheering = () => {
    try {
      const cheer = () => {
        animation.current?.play?.(80, 128);
        setSpeed(Speed.REGULAR);
      };
      progress.value = withSequence(
        withTiming(1, { duration: 500 }, () => {
          "worklet";
          try {
            runOnJS(cheer)();
          } catch (error) {}
        }),
        withTiming(0, { duration: 2000 }, () => {
          "worklet";
          try {
            runOnJS(playIdle)();
          } catch (error) {}
        }),
      );
    } catch (error) {}
  };

  const pause = () => {
    try {
      animation.current?.pause?.();
    } catch (error) {}
  };

  // const playTilt = () => {
  //   try {
  //     const playSad = () => {
  //       try {
  //         setSpeed(Speed.IDLE);

  //         animation.current?.play?.(140, 159);
  //       } catch (error) {}
  //     };

  //     const playHappy = () => {
  //       try {
  //         setSpeed(Speed.IDLE);

  //         animation.current?.play?.(159, 180);
  //       } catch (error) {}
  //     };

  //     progress.value = withSequence(
  //       withTiming(1, { duration: 500 }, () => {
  //         "worklet";
  //         try {
  //           runOnJS(playSad)();
  //         } catch (error) {}
  //       }),
  //       withTiming(0.5, { duration: 2000 }, () => {
  //         "worklet";
  //         try {
  //           runOnJS(playHappy)();
  //         } catch (error) {}
  //       }),
  //       withTiming(0, { duration: 2000 }, () => {
  //         "worklet";
  //         try {
  //           runOnJS(pause)();
  //         } catch (error) {}
  //       })
  //     );
  //   } catch (error) {}
  // };

  const playSad = () => {
    try {
      const play = () => {
        setSpeed(Speed.REGULAR);
        animation.current?.play?.(135, 158);
      };

      progress.value = withSequence(
        withTiming(1, { duration: 1000 }, (finished) => {
          "worklet";
          try {
            if (finished) {
              runOnJS(play)();
            }
          } catch (error) {}
        }),
        withTiming(0, { duration: 1000 }, (finished) => {
          "worklet";
          try {
            if (finished) {
              runOnJS(pause)();
            }
          } catch (error) {}
        }),
      );
    } catch (error) {}
  };

  const playHappy = () => {
    try {
      const play = () => {
        setSpeed(Speed.IDLE);
        animation.current?.play?.(158, 180);
      };

      progress.value = withSequence(
        withTiming(0, { duration: 100 }, (finished) => {
          "worklet";
          try {
            if (finished) {
              runOnJS(play)();
            }
          } catch (error) {}
        }),
        withTiming(1, { duration: 1000 }, (finished) => {
          "worklet";
          try {
            if (finished) {
              runOnJS(playIdle)();
            }
          } catch (error) {}
        }),
      );

      animation.current?.play?.(159, 180);
    } catch (error) {}
  };

  useEffect(() => {
    if (animation.current) {
      playIdle();
    }
  }, []);

  useEffect(() => {
    if (posture === "bad" && posture !== status) {
      playSad();
    }

    if (posture === "good" && posture !== status) {
      playHappy();
    }

    if (posture === "not_reading" && posture !== status) {
      playIdle();
    }

    setStatus(posture);
  }, [posture]);

  return (
    <Pressable onPress={playCheering}>
      <LottieView
        ref={animation}
        speed={speed}
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: -10,
          aspectRatio: 2,
          zIndex: layers.weasel,
        }}
        source={require("../../animations/weasel_home.json")}
      />
    </Pressable>
  );
};

export default RealtimeTrackingBackground;
