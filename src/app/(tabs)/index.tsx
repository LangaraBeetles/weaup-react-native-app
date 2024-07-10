import React from "react";

import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
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
import Image from "@src/components/ui/Image";
import RealtimeTrackingBackground from "@src/components/posture/RealtimeTrackingBackground";
import SessionBackground from "@src/components/posture/SessionBackground";

const { height } = Dimensions.get("screen");

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const userLevel = useUser((state) => state.user.level);
  const sessionStatus = useUser((state) => state.sessionStatus);

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
        <Stack flexDirection="row" justifyContent="space-between" p={15} pb={0}>
          <Stack
            flexDirection="row"
            gap={8}
            backgroundColor={theme.colors.white}
            borderRadius={100}
            py={8}
            pl={8}
            pr={12}
            alignItems="center"
          >
            <Stack flexDirection="row" gap={4}>
              {/* <Image name="avatar" w={25} h={25} /> */}
              {userName !== "null" ? (
                <Text
                  style={{ color: theme.colors.neutral[800] }}
                  level="footnote"
                  weight="bold"
                >
                  {userName !== null && userName.split(" ")[0]}
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

        <Center p={15}>
          {Platform.OS === "ios" && <DeviceMotionViewiOS />}
          {Platform.OS === "android" && <DeviceMotionViewAndroid />}
        </Center>

        <Stack h={286} my={15}>
          <Center>
            {sessionStatus === "INACTIVE" ? (
              <Image name="weasel-happy" />
            ) : (
              <SessionBackground />
            )}
          </Center>
        </Stack>
        <Center style={styles.sessionButton}>
          <SessionControl />
          <Button
            title="Badge"
            onPress={() => {
              router.push({ pathname: "/earn-badge", params: { badgeId: 1 } });
            }}
          />
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
  },
});

export default HomePage;
