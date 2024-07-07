import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ViewStyle } from "react-native";
import { theme } from "@src/styles/theme";

const Skeleton: React.FC<{
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  initialOpacity?: number;
}> = ({ initialOpacity, duration = 900, delay = 0, style }) => {
  const opacity = useSharedValue(initialOpacity ?? 1);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(
          delay,
          withTiming(0, { duration: duration, easing: Easing.cubic }),
        ),
        withTiming(1, { duration: duration, easing: Easing.cubic }),
      ),
      -1,
      true,
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: 100,
          backgroundColor: theme.colors.neutral[100],
          borderRadius: 16,
          ...style,
        },
        animatedStyles,
      ]}
    />
  );
};

export default Skeleton;
