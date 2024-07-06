import React, { useEffect } from "react";

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

import { useRef } from "react";
import { theme } from "@src/styles/theme";
import ScoreComponent from "@src/components/homepage/ScoreComponent";
import Gradient from "@src/components/ui/Gradient";
import Image from "@src/components/ui/Image";

const { height } = Dimensions.get("screen");

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const userLevel = useUser((state) => state.user.level);
  const currentPosture = useUser((state) => state.currentPosture);
  const sessionStatus = useUser((state) => state.sessionStatus);

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

      {sessionStatus === "INACTIVE" && (
        <Stack h={height} style={styles.backgroundImage}>
          {currentPosture === "bad" ? (
            <Image name="background-bad" />
          ) : (
            <Image name="background-happy" />
          )}
        </Stack>
      )}
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
              <Image name="avatar" w={25} h={25} />
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

        {sessionStatus === "INACTIVE" && (
          <Center p={15}>
            {Platform.OS === "ios" && <DeviceMotionViewiOS />}
            {Platform.OS === "android" && <DeviceMotionViewAndroid />}
          </Center>
        )}

        <Stack h={286} my={15}>
          <Center>
            {sessionStatus === "INACTIVE" ? (
              <Image name="weasel-happy" />
            ) : (
              <>
                <Stack w={290} h={290}>
                  <Image
                    name="green-gradient"
                    style={StyleSheet.absoluteFillObject}
                  />
                  <Stack
                    mt={18}
                    h={253}
                    w={253}
                    borderColor={theme.colors.white}
                    border={12}
                    borderRadius={150}
                    style={{ overflow: "hidden", alignSelf: "center" }}
                  >
                    <Image
                      name="background-happy"
                      style={[
                        StyleSheet.absoluteFillObject,
                        styles.backgroundImageFill,
                      ]}
                    />
                    <Center style={{ marginTop: 25 }}>
                      <Image name="weasel-side-peaceful" w={109} h={230} />
                    </Center>
                  </Stack>
                </Stack>
                <Text>{currentPosture}</Text>
                {/* TODO: remove text */}
              </>
            )}
          </Center>
        </Stack>
        <Center style={styles.sessionButton}>
          <SessionControl />
        </Center>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 115,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
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
