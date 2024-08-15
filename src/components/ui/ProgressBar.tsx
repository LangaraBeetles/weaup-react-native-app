import React from "react";
import { theme } from "@src/styles/theme";
import Icon from "./Icon";
import Animated, {
  runOnJS,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

function calculatePercentage(currentValue: number, goal: number) {
  if (goal === 0) {
    return 0;
  }
  const percentage = (currentValue / goal) * 100;
  return percentage > 100 ? 100 : percentage;
}

const ProgressBar = (props: {
  currentValue: number;
  goal: number;
  backgroundColor: string;
  barColor: string;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
  onAnimationEnd?: (progress: number) => void;
  icon?: boolean;
  delay?: number;
}) => {
  const {
    currentValue,
    goal,
    backgroundColor,
    barColor,
    height,
    borderWidth,
    borderColor,
    onAnimationEnd,
    icon,
    delay = 0,
  } = props;

  const progress = calculatePercentage(currentValue, goal);
  const animatedWidth = useSharedValue(0);
  const iconOpacity = useSharedValue(0.7);

  const onEnd = () => onAnimationEnd?.(progress);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;

    if (progress === 100) {
      iconOpacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
    }

    animatedWidth.value = withDelay(
      delay,
      withTiming(
        (progress / 100) * width,
        {
          duration: 1000,
        },
        (finished) => {
          "worklet";

          if (finished) {
            try {
              runOnJS(onEnd)();
            } catch (error) {}
          }
        },
      ),
    );
  };

  return (
    <View onLayout={handleLayout}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || theme.colors.white,
            height: height || 10,
            borderRadius: (height || 10) / 2,
            borderWidth: borderWidth || 0,
            borderColor: borderColor || theme.colors.neutral[100],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            width: animatedWidth,
            backgroundColor: barColor || "#000",
            height: height || 10,
            borderRadius: (height || 10) / 2,
          },
        ]}
      />
      {icon && (
        <Animated.View
          style={[
            styles.icon,
            {
              opacity: iconOpacity,
            },
          ]}
        >
          <Icon name="star-circle" size={32} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  bar: {
    marginVertical: 10,
    position: "absolute",
  },
  icon: {
    position: "absolute",
    top: 2,
    right: -5,
  },
});

export default ProgressBar;
