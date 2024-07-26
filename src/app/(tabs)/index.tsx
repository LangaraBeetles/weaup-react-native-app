import React, { useEffect, useRef, useState } from "react";

import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Link, Redirect } from "expo-router";
import DeviceMotionViewiOS, {
  DeviceMotionViewAndroid,
} from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import SessionControl from "@src/components/sessions/SessionControl";
import Stack from "@src/components/ui/Stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Center from "@src/components/ui/Center";
import Icon from "@src/components/ui/Icon";
import TrackingModeIcon from "@src/components/homepage/TrackingModeIcon";
import { Text } from "@src/components/ui/typography";

import { theme } from "@src/styles/theme";
import ScoreComponent from "@src/components/homepage/ScoreComponent";
import Gradient from "@src/components/ui/Gradient";
import RealtimeTrackingBackground from "@src/components/posture/RealtimeTrackingBackground";
import SessionBackground from "@src/components/posture/SessionBackground";
import Avatar from "@src/components/ui/Avatar";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("screen");

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const avatarColor = useUser((state) => state.user.avatar);
  const userLevel = useUser((state) => state.user.level);
  const sessionStatus = useUser((state) => state.sessionStatus);
  const currentPosture = useUser((state) => state.currentPosture);
  const isActiveMonitoring = useUser((state) => state.isTrackingEnabled);

  const animation = useRef<any>(null);
  const [progress, setProgress] = useState<number>(0.5);

  useEffect(() => {
    if (animation && isActiveMonitoring && sessionStatus === "INACTIVE") {
      let value = progress;
      if (currentPosture === "good") {
        value = value - 0.2;
      }
      if (currentPosture === "mid") {
        value = value + 0.2;
      }
      if (currentPosture === "bad") {
        value = value + 0.5;
      }
      if (currentPosture === "not_reading") {
        value = 0.05;
      }

      if (value > 1) {
        setProgress(1);
      } else if (value < 0) {
        setProgress(0);
      } else {
        setProgress(value);
      }
    }
  }, [isActiveMonitoring, sessionStatus, animation, currentPosture, progress]);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <SafeAreaView
      style={{
        position: "relative",
        height: height,
        backgroundColor: theme.colors.white,
      }}
    >
      <Gradient
        color1={theme.colors.primary[300]}
        color2={theme.colors.white}
        locations={[0, 0.8]}
      />

      {sessionStatus === "INACTIVE" && <RealtimeTrackingBackground />}

      <ScrollView style={{ flex: 1, zIndex: 2 }}>
        <Stack
          style={styles.onTop}
          flexDirection="row"
          justifyContent="space-between"
          p={15}
          pb={0}
          alignItems="center"
        >
          <Stack
            flexDirection="row"
            gap={8}
            backgroundColor={theme.colors.white}
            borderRadius={100}
            px={12}
            h={41}
            alignItems="center"
          >
            <Stack flexDirection="row" gap={4} alignItems="center" h={25}>
              <Avatar
                variant={avatarColor}
                content={userName?.[0] ?? "G"}
                size={25}
                fontSize={10}
              />
              {userName !== "null" ? (
                <Text
                  style={{ color: theme.colors.neutral[800] }}
                  level="footnote"
                  weight="bold"
                >
                  {userName !== null && userName?.split(" ")[0]}
                </Text>
              ) : null}
            </Stack>
            <Text
              style={{ color: theme.colors.neutral[400] }}
              level="caption_1"
              weight="bold"
            >
              Lv.{userLevel}
            </Text>
          </Stack>
          <Stack flexDirection="row" gap={18} border={0} p={5}>
            <TrackingModeIcon />

            <Center>
              <Stack
                backgroundColor={theme.colors.white}
                h={40}
                w={40}
                alignItems="center"
                justifyContent="center"
                borderRadius={20}
              >
                <Link href="/notifications" asChild>
                  <Pressable>
                    <Icon name="notification-outline" />
                  </Pressable>
                </Link>
              </Stack>
            </Center>
          </Stack>
        </Stack>

        <ScoreComponent />

        <Center style={styles.onTop} p={15}>
          {Platform.OS === "ios" && <DeviceMotionViewiOS />}
          {Platform.OS === "android" && <DeviceMotionViewAndroid />}
        </Center>

        <Stack h={286} my={15}>
          {sessionStatus === "INACTIVE" ? (
            <Stack>
              <LottieView
                autoPlay={false}
                ref={animation}
                duration={1000}
                progress={progress}
                style={{
                  width: width,
                  height: height / 1.3,
                  position: "absolute",
                  top: -150,
                  bottom: 0,
                  aspectRatio: 2,
                  zIndex: -1,
                }}
                source={require("../../animations/front_view.json")}
              />
            </Stack>
          ) : (
            <Center>
              <SessionBackground />
            </Center>
          )}
        </Stack>

        <Center style={styles.sessionButton}>
          <SessionControl />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImageFill: {
    flex: 1,
    transform: [{ scale: 2 }, { translateY: 10 }],
  },
  sessionButton: {
    width: 250,
    alignSelf: "center",
    zIndex: 2,
  },
  onTop: {
    zIndex: 2,
  },
});

export default HomePage;
