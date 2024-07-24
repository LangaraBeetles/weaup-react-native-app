import { theme } from "@src/styles/theme";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const ProgressBar = (props: {
  currentValue: number;
  goal: number;
  backgroundColor: string;
  barColor: string;
  children?: React.ReactNode;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
  onAnimationEnd?: () => void;
}) => {
  const {
    currentValue,
    goal,
    children,
    backgroundColor,
    barColor,
    height,
    borderWidth,
    borderColor,
    onAnimationEnd,
  } = props;
  const progress = goal > 0 ? (currentValue / goal) * 100 : 0;
  const animation = new Animated.Value(progress);
  const counter = useRef(new Animated.Value(0)).current;

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(counter, {
      toValue: animation,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    });
  }, [currentValue]);

  return (
    <View>
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
            width: width,
            backgroundColor: barColor || "#000",
            height: height || 10,
            borderRadius: (height || 10) / 2,
          },
        ]}
      />
      {children}
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
});

export default ProgressBar;
