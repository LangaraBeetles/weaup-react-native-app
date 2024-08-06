import React from "react";

import { Platform, Dimensions, TouchableOpacity } from "react-native";
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
import RealtimeTrackingBackground from "@src/components/posture/RealtimeTrackingBackground";
import SessionBackground from "@src/components/posture/SessionBackground";
import Avatar from "@src/components/ui/Avatar";
import { LinearGradient as Gradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("screen");

const layers = {
  stats: 1,
  gradient: -5,
};

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const avatarImg = useUser((state) => state.user.avatar_img);
  const avatarColor = useUser((state) => state.user.avatar_bg);
  const userLevel = useUser((state) => state.user.level);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const isGuest = useUser((state) => state.isGuest);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.primary[400],
      }}
    >
      <Stack>
        {/* Yellow Gradient */}
        <Gradient
          colors={[theme.colors.primary[400], theme.colors.primary[50]]}
          locations={[0, 0.5]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height,
            zIndex: layers.gradient,
          }}
        />

        <Stack
          style={{
            position: "absolute",
            width,
            zIndex: layers.stats,
          }}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            p={15}
            pb={0}
            alignItems="center"
          >
            <Stack
              flexDirection="row"
              gap={6}
              backgroundColor={theme.colors.white}
              borderRadius={100}
              px={10}
              h={41}
              alignItems="center"
            >
              <Stack flexDirection="row" gap={6} alignItems="center" h={25}>
                <Avatar
                  variant={avatarColor}
                  content={userName?.[0] ?? "G"}
                  size={30}
                  fontSize={14}
                  showDefault={isGuest}
                  src={avatarImg}
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
                <Link href="/notifications" asChild>
                  <TouchableOpacity>
                    <Stack
                      backgroundColor={theme.colors.white}
                      h={40}
                      w={40}
                      alignItems="center"
                      justifyContent="center"
                      borderRadius={20}
                    >
                      <Icon name="notification-outline" />
                    </Stack>
                  </TouchableOpacity>
                </Link>
              </Center>
            </Stack>
          </Stack>
          <ScoreComponent />
          <Center p={15}>
            {Platform.OS === "ios" && <DeviceMotionViewiOS />}
            {Platform.OS === "android" && <DeviceMotionViewAndroid />}
          </Center>
        </Stack>

        {sessionStatus === "INACTIVE" ? (
          <RealtimeTrackingBackground />
        ) : (
          <Center>
            <SessionBackground />
          </Center>
        )}
        <Center
          style={{
            width: 250,
            alignSelf: "center",
            zIndex: layers.stats,
            position: "absolute",
            bottom: Platform.OS === "ios" ? 20 : height * 0.1,
            justifyContent: "flex-end",
          }}
        >
          <SessionControl />
        </Center>
      </Stack>
    </SafeAreaView>
  );
};

export default HomePage;
