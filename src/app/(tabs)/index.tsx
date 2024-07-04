import React, { useEffect } from "react";

import { Image, Platform, Pressable, ScrollView, View } from "react-native";
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

import LottieView from "lottie-react-native";
import { useRef } from "react";
import { theme } from "@src/styles/theme";
import ScoreComponent from "@src/components/homepage/ScoreComponent";
import Gradient from "@src/components/ui/Gradient";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const userLevel = useUser((state) => state.user.level);
  const currentPosture = useUser((state) => state.currentPosture);
  // const isSessionActive = useUser((state) => state.isSessionActive);
  const isSessionActive = true;
  const animation = useRef<any>(null);

  useEffect(() => {
    if (animation.current) {
      animation.current?.play?.(0, 0);

      if (currentPosture === "mid") {
        animation.current?.play?.(6, 6);
      }

      if (currentPosture === "bad") {
        animation.current?.play?.(15, 50);
      }
    }
  }, [currentPosture]);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Gradient
        color1={theme.colors.primary[300]}
        color2={theme.colors.white}
      />
      <ScrollView>
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
            {/*TODO: display avatar */}
            <Stack flexDirection="row" gap={4}>
              <Image source={require("../../../assets/img/avatar.png")} />
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
              <Link href="/notifications" asChild>
                <Pressable>
                  <Icon name={"notification-outline"} />
                </Pressable>
              </Link>
            </Center>
          </Stack>
        </Stack>

        <ScoreComponent />

        {!isSessionActive && (
          <Center p={15}>
            {Platform.OS === "ios" && <DeviceMotionViewiOS />}
            {Platform.OS === "android" && <DeviceMotionViewAndroid />}
          </Center>
        )}

        <View style={{ width: "100%", height: 350 }}>
          <Center>
            {Platform.OS === "ios" ? (
              <LottieView
                autoPlay={false}
                ref={animation}
                progress={1}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                source={require("../../animations/alien.json")}
              />
            ) : (
              <Image source={require("../../../assets/img/mascot.png")} />
            )}
          </Center>
        </View>
        <Center>
          <SessionControl />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
