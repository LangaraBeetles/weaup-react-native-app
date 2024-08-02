import React, { useEffect } from "react";
import { Dimensions, Platform } from "react-native";
import { usePushNotifications } from "@root/src/components/providers/PushNotificationsProvider";
import ContentCard from "@src/components/setup/ContentCard";
import Button from "@src/components/ui/Button";
import Image from "@src/components/ui/Image";
import Stack from "@src/components/ui/Stack";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

type StartProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

const EnableNotifications: React.FC<StartProps> = ({ changePage }) => {
  const { registerForPushNotifications } = usePushNotifications();

  const fadeInMain = useSharedValue(0);
  const slideUpAnimation = useSharedValue(300);
  const wallieOpacity = useSharedValue(0);
  const exclamationFadeIn = useSharedValue(0);

  useEffect(() => {
    fadeInMain.value = withDelay(100, withTiming(1, { duration: 500 }));
    exclamationFadeIn.value = withDelay(2000, withTiming(1, { duration: 500 }));
    slideUpAnimation.value = withDelay(
      400,
      withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      }),
    );
    wallieOpacity.value = withDelay(1600, withTiming(1, { duration: 500 }));
  }, []);

  const mainStyle = useAnimatedStyle(() => ({
    opacity: fadeInMain.value,
  }));

  const exclamationFade = useAnimatedStyle(() => ({
    opacity: exclamationFadeIn.value,
  }));

  const slideUpStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUpAnimation.value }],
    opacity: wallieOpacity.value,
  }));

  const handleRegister = () => {
    registerForPushNotifications(() => {
      changePage("next");
    });
  };

  const handleSkip = () => {
    changePage("next");
  };

  return (
    <Stack h={height} style={{ alignItems: "center" }}>
      {height < 850 && Platform.OS === "android" ? (
        ""
      ) : (
        <Animated.View style={[mainStyle, { top: height * 0.05 }]}>
          <Stack>
            <Image name="notification-window" width={340} height={200} />
          </Stack>
        </Animated.View>
      )}

      <Stack
        gap={23}
        alignItems="center"
        style={{ position: "absolute", bottom: height * 0.1 }}
      >
        <Animated.View style={[slideUpStyle, { top: 40 }]}>
          <Stack w={141} h={251}>
            <Image name="wally-on-the-phone" />
          </Stack>
        </Animated.View>
        <Animated.View
          style={[
            exclamationFade,
            { position: "absolute", left: width * 0.15, top: 130 },
          ]}
        >
          <Stack w={50} h={40}>
            <Image name="notification-exclamation" />
          </Stack>
        </Animated.View>
        <Animated.View style={[mainStyle]}>
          <ContentCard
            title="Get Real-time Alerts"
            text={"Wally will remind you when your posture\n needs correction."}
            section={"setup"}
          />
        </Animated.View>
        <Animated.View style={[mainStyle]}>
          <Stack w={width * 0.9} gap={12}>
            <Button
              title="Allow Notifications"
              onPress={handleRegister}
              variant="primary"
            />
            <Button
              title="Maybe Later"
              onPress={handleSkip}
              variant="secondary"
            />
          </Stack>
        </Animated.View>
      </Stack>
    </Stack>
  );
};

export default EnableNotifications;
