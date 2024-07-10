import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import Spacer from "@src/components/ui/Spacer";
import Button from "@src/components/ui/Button";
import { useRouter } from "expo-router";
import Badge from "@src/components/ui/Badge";
import Image from "@src/components/ui/Image";
import type { EasingFunction } from "react-native";
import { theme } from "@src/styles/theme";

const EarnBadgeScreen = () => {
  const router = useRouter();
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const backgroundScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const animate = (easing: EasingFunction) => {
    backgroundOpacity.setValue(0);
    backgroundScale.setValue(0);
    buttonOpacity.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 1200,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundScale, {
          toValue: 1,
          duration: 1200,
          easing,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animate(Easing.elastic(1));
  }, []);

  const backgroundAnimatedStyles = {
    opacity: backgroundOpacity,
    transform: [
      {
        scale: backgroundScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const buttonAnimatedStyles = {
    opacity: buttonOpacity,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.white, theme.colors.primary[400]]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.1199 }}
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
      />
      <Stack alignItems="center">
        <Text level="title_1">Congratulations!</Text>
        <Spacer height={411} />

        <View style={styles.message}>
          <Text level="footnote" align="center">
            You've aced your way to 1000 XP! Keep up the excellent work!
          </Text>
        </View>
      </Stack>

      <View style={styles.badge}>
        <Animated.View style={backgroundAnimatedStyles}>
          <Badge
            name="xp"
            title="1k"
            unlocked={true}
            subtitle="XP Champion"
            size="large"
          />
        </Animated.View>
      </View>
      <View style={styles.backgroundContainer}>
        <Animated.View style={backgroundAnimatedStyles}>
          <Image name="badge-background" />
        </Animated.View>
      </View>
      <Animated.View style={[styles.button, buttonAnimatedStyles]}>
        <Button title="Collect Badge" onPress={router.back} />
      </Animated.View>
    </View>
  );
};

export default EarnBadgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 230,
    paddingTop: 37,
  },
  badge: {
    position: "absolute",
    top: 300,
    width: 200,
  },
  message: {
    width: 230,
  },
  backgroundContainer: {
    position: "absolute",
    zIndex: -1,
    top: -40,
    width: "100%",
    height: "100%",
  },
});
