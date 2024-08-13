import React, { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import { theme } from "@src/styles/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
  setTimeout(() => {
    router.navigate("/");
  }, 2500);

  const wallyPosition = useSharedValue(0);
  const cloudsPosition = useSharedValue(0);

  useEffect(() => {
    wallyPosition.value = withRepeat(
      withTiming(40, { duration: 1000 }),
      -1,
      true,
    );
    cloudsPosition.value = withRepeat(
      withTiming(width, { duration: 5000 }),
      -1,
    );
  }, []);

  const wallyStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: wallyPosition.value - 20 }],
    };
  });

  const cloudsStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: cloudsPosition.value }],
    };
  });

  return (
    <Stack h={height} alignItems="center">
      <Animated.View
        style={[wallyStyle, { paddingTop: height * 0.13, zIndex: 2 }]}
      >
        <Image
          source={require("../../../assets/img/flying_wally.png")}
          style={{ width: 293, height: 507 }}
        />
      </Animated.View>
      <Animated.View
        style={[cloudsStyle, { position: "absolute", top: 110, right: 0 }]}
      >
        <Image
          source={require("../../../assets/img/Clouds.png")}
          style={{ width: 600, height: 450 }}
        />
      </Animated.View>
      <Stack style={{ position: "absolute", bottom: height * 0.2 }}>
        <Text
          level="badge_title"
          weight="semibold"
          align="center"
          style={{ color: theme.colors.primary[900] }}
        >
          Time to sit up straight and{"\n"}shine with WeaUP!
        </Text>
      </Stack>
    </Stack>
  );
};

export default Welcome;
