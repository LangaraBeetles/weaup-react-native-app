import React, { useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  width: number;
  height: number;
  show?: boolean;
  onAnimationEnd?: () => void;
  duration?: number;
}

const Shimmer: React.FC<RippleProps> = ({
  style,
  children,
  width,
  height,
  onAnimationEnd = () => false,
  duration = 3000,
  show = false,
}) => {
  const initialX = -(width / 2);
  const initialY = -(height / 2);

  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  const rippleStyle = useAnimatedStyle(() => {
    const color = "white";
    return {
      width: 15,
      height: "200%",
      backgroundColor: color,
      shadowColor: color,
      position: "absolute",
      shadowRadius: 16.0,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      opacity: 0.7,
      top: 0,
      left: 0,
      zIndex: 1,
      transform: [
        { rotate: "-30deg" },
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        // {
        //   translateX: -20,
        // },
        // {
        //   translateY: initialY,
        // },
      ],
    };
  });

  useEffect(() => {
    if (show) {
      translateX.value = initialX;
      translateY.value = initialY;

      translateX.value = withTiming(width * 2, {
        duration,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(
        height,
        {
          duration,
          easing: Easing.inOut(Easing.ease),
        },
        (finished) => {
          "worklet";

          if (finished) {
            runOnJS(onAnimationEnd)();
          }
        },
      );
    }
  }, [show]);

  return (
    <View style={style}>
      <Animated.View style={[style, { overflow: "hidden" }]}>
        <View>{children}</View>
        <Animated.View style={rippleStyle}></Animated.View>
      </Animated.View>
    </View>
  );
};

export default Shimmer;
