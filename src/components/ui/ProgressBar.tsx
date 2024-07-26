import { theme } from "@src/styles/theme";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, LayoutChangeEvent } from "react-native";
import Icon from "./Icon";

const ProgressBar = (props: {
  currentValue: number;
  goal: number;
  backgroundColor: string;
  barColor: string;
  height?: number;
  borderWidth?: number;
  borderColor?: string;
  onAnimationEnd?: () => void;
  icon?: boolean;
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
  } = props;

  const [barWidth, setBarWidth] = useState(0);
  const progress = goal > 0 ? (currentValue / goal) * 100 : 0;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: [0, barWidth],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    });
  }, [progress]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBarWidth(width);
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
            width: width,
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
              transform: [{ translateX: width }],
            },
          ]}
        >
          <Icon name="star-circle" style={styles.iconImage} />
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
    top: 8,
    left: -19,
    height: 32,
    width: 32,
  },
  iconImage: {
    height: "100%",
    width: "100%",
  },
});

export default ProgressBar;
