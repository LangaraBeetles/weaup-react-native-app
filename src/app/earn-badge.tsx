import React, { useEffect, useRef } from "react";
import { Animated, Easing, SafeAreaView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import Button from "@src/components/ui/Button";
import { useLocalSearchParams, useRouter } from "expo-router";
import Badge, { BadgeName } from "@src/components/ui/Badge";
import Image from "@src/components/ui/Image";
import type { EasingFunction } from "react-native";
import { theme } from "@src/styles/theme";
import badges from "@src/badges";

const getUnlockedBadgeName = (name: string | undefined): BadgeName => {
  switch (name) {
    case "xp":
      return "xp-unlock";
    case "dummy-badge":
      return "dummy-badge";
    case "locked":
      return "locked";
    case "challenge":
      return "challenge-unlock";
    case "streak":
      return "streak-unlock";
    default:
      return "xp";
  }
};

const EarnBadgeScreen = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const { badgeId } = params;

  const badge = badges.find((badge) => badge.id === Number(badgeId));

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
      {/* Gradient */}
      <LinearGradient
        colors={[theme.colors.random.lightgreen, theme.colors.white]}
        locations={[0, 0.8]}
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
      />
      {/* Shinning Background */}
      <View style={styles.backgroundContainer}>
        <Animated.View style={backgroundAnimatedStyles}>
          <Image name="badge-background" />
        </Animated.View>
      </View>

      {/* Content */}
      <SafeAreaView style={[styles.container]}>
        <Stack justifyContent="center" alignItems="center" gap={70}>
          <Text level="title_1">Congratulations!</Text>

          <View style={styles.badge}>
            <Animated.View style={backgroundAnimatedStyles}>
              <Badge
                name={getUnlockedBadgeName(badge?.badge)}
                unlocked={true}
                size="large"
                color={badge?.color}
              />
            </Animated.View>
          </View>

          <View style={styles.message}>
            <Text
              level="headline"
              align="center"
              style={{ color: theme.colors.neutral[600] }}
            >
              {badge?.message}
            </Text>
          </View>

          <Animated.View style={[styles.button, buttonAnimatedStyles]}>
            <Button title="Collect Badge" onPress={router.back} />
          </Animated.View>
        </Stack>
      </SafeAreaView>
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
  },
  badge: {},
  message: {
    width: 230,
  },
  backgroundContainer: {
    position: "absolute",
    zIndex: -1,
    top: -40,
    width: "110%",
    height: "100%",
  },
});
