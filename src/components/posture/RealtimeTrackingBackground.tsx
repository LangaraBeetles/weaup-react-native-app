import { useUser } from "@src/state/useUser";
import { theme } from "@src/styles/theme";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import Stack from "@src/components/ui/Stack";
import Image from "@src/components/ui/Image";

const { height } = Dimensions.get("screen");

const RealtimeTrackingBackground = () => {
  const currentPosture = useUser((state) => state.currentPosture);

  const badBackgroundOpacity = useSharedValue<number>(0);

  useEffect(() => {
    if (currentPosture === "good" || currentPosture === "not_reading") {
      badBackgroundOpacity.value = withTiming(0);
    }

    if (currentPosture === "mid") {
      badBackgroundOpacity.value = withTiming(0.3, { duration: 200 });
    }

    if (currentPosture === "bad") {
      badBackgroundOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [currentPosture]);

  return (
    <>
      <Animated.View
        style={[
          styles.animatedBackground,
          {
            opacity: badBackgroundOpacity,
          },
        ]}
      >
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
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

              <Stop offset="100%" stopColor={"transparent"} stopOpacity={0.3} />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#background-gradient)" />
        </Svg>
      </Animated.View>

      <Stack h={height} style={styles.backgroundImage}>
        <View style={{ opacity: 1 }}>
          <Image name="background-happy" />
        </View>
      </Stack>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 115,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  animatedBackground: {
    zIndex: 2,
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default RealtimeTrackingBackground;
