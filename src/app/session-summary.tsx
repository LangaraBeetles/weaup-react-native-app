import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import SessionCard from "@src/components/sessions/SessionCard";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image, { ImageConfig, ImageName } from "@src/components/ui/Image";
import { getSessionById } from "@src/services/sessionApi";
import { useQuery } from "@tanstack/react-query";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useUser } from "../state/useUser";
import { useLevelSystem } from "../components/providers/LevelSystemProvider";
import safenumber from "../utils/safenumber";
import { LevelType } from "../interfaces/level.types";
import levels from "../levels";

import * as Haptics from "expo-haptics";
import Box from "../components/ui/Box";
import Icon from "../components/ui/Icon";

const { height, width } = Dimensions.get("window");

const SessionSummaryScreen: React.FC = () => {
  const { sessionId } = useLocalSearchParams<{
    sessionId: string;
  }>();

  const path = usePathname();

  const { isLoading, data } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionById(sessionId ?? ""),
    enabled: !!sessionId && path === "/session-summary",
  });

  const sessionData = data?.data;

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.primary[200], flex: 1 }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1 }}
          color={theme.colors.primary[600]}
        />
      ) : (
        <SessionSummaryContent sessionData={sessionData} />
      )}
    </SafeAreaView>
  );
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes ?? 0).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const getNextLevel = (targetLevel: number, levelsList: LevelType[]) => {
  const nextLevelConfig = levelsList.find(({ level }) => level == targetLevel);

  return nextLevelConfig;
};

function calculatePercentage(currentValue: number, goal: number) {
  if (goal === 0) {
    return 0;
  }
  const percentage = (currentValue / goal) * 100;
  return percentage > 100 ? 100 : percentage;
}

const getImageNameForLevel = (level: number): ImageName => {
  const imageName = `level-${level}` as ImageName;
  if (imageName in ImageConfig) {
    return imageName;
  }
  return "level-1"; // Fallback
};

const SessionSummaryContent = ({ sessionData }: { sessionData: any }) => {
  const totalRecords = sessionData?.total_records || 0;
  const goodPosturePercentage = totalRecords
    ? Math.round(((sessionData?.total_good || 0) / totalRecords) * 100)
    : 0;
  const badPosturePercentage = 100 - goodPosturePercentage;

  // Session XP Card
  const userLevel = useUser((state) => state.user.level);
  const { showLevelUpModal, levelupFinished } = useLevelSystem();
  const current = safenumber(sessionData?.xp?.final);
  const goal = safenumber(getNextLevel(userLevel + 1, levels)?.xp);

  const currentPercentage = calculatePercentage(
    current,
    sessionData?.xp?.initial,
  );
  const progress = calculatePercentage(current, goal);

  /**
   * Animations
   */

  // Title
  const titleTranslateY = useSharedValue(-100);
  const titleOpacity = useSharedValue(0);

  // Body Card
  const cardTranslateY = useSharedValue(height);

  // Weasel Image
  const imageTranslateY = useSharedValue(200);
  const imageOpacity = useSharedValue(0);

  // Background Image
  const backgroundTop = useSharedValue(height);
  const backgroundOpacity = useSharedValue(0);

  // Confetti Image
  const confettiScale = useSharedValue(0);
  const confettiTranslateY = useSharedValue(-100);

  // ProgressBar
  const progressBarWidth = useSharedValue(0);

  // Level Image
  const levelImageOpacity = useSharedValue<number>(0.55);
  const levelImageScale = useSharedValue<number>(1);

  const titleStyles = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      {
        translateY: titleTranslateY.value,
      },
    ],
  }));

  const cardStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: cardTranslateY.value,
      },
    ],
  }));

  const imageStyles = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [
      {
        translateY: imageTranslateY.value,
      },
    ],
  }));

  const backgroundStyles = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
    top: backgroundTop.value,
  }));

  const confettiStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: confettiTranslateY.value,
      },
      {
        scale: confettiScale.value,
      },
    ],
  }));

  const triggerHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const startAnimations = (event: any) => {
    const { width: barWidth } = event.nativeEvent.layout;
    progressBarWidth.value = withTiming((currentPercentage / 100) * barWidth, {
      duration: 100,
    });
    levelImageOpacity.value = withTiming(0.55, { duration: 100 });

    levelImageScale.value = withTiming(1, {
      duration: 100,
    });

    titleOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    titleTranslateY.value = withDelay(100, withTiming(0, { duration: 1000 }));

    cardTranslateY.value = withDelay(
      100,
      withTiming(0, { duration: 1000 }, () => {
        imageOpacity.value = withTiming(1, { duration: 600 });
        imageTranslateY.value = withTiming(0, { duration: 600 });

        backgroundOpacity.value = withTiming(1, { duration: 600 });
        backgroundTop.value = withTiming(-100, { duration: 600 });

        confettiTranslateY.value = withTiming(50, { duration: 600 });
        confettiScale.value = withTiming(1, { duration: 600 }, () => {
          confettiTranslateY.value = withTiming(100, { duration: 1000 });
          confettiScale.value = withTiming(0, { duration: 1000 }, () => {
            progressBarWidth.value = withTiming(
              (progress / 100) * barWidth,
              {
                duration: 1000,
              },
              (finished) => {
                "worklet";
                runOnJS(triggerHaptics)();
                if (finished && progress == 100) {
                  levelImageOpacity.value = withTiming(1, { duration: 800 });
                  levelImageScale.value = withTiming(
                    1.1,
                    { duration: 1000 },
                    () => {
                      "worklet";

                      runOnJS(showLevelUpModal)();
                      runOnJS(triggerHaptics)();
                    },
                  );
                }
              },
            );
          });
        });
      }),
    );
  };

  return (
    <Stack style={{ flex: 1 }}>
      <Stack h={height * 0.3}>
        <Animated.View style={[titleStyles]}>
          <Center gap={4} style={{ top: height * 0.05 }}>
            <Text level="body">You did a great job! 🎉</Text>
            <Text level="title_2">
              Your posture score is: {goodPosturePercentage}
            </Text>
          </Center>
        </Animated.View>

        <Animated.View style={[imageStyles]}>
          <Animated.View
            style={[
              backgroundStyles,
              {
                position: "absolute",
                width: "100%",
                height: "100%",
              },
            ]}
          >
            <Center w="100%" h="100%">
              <Image name="session-background" />
            </Center>
          </Animated.View>

          <Center
            w="100%"
            h="100%"
            style={{
              marginHorizontal: "auto",
              marginTop: height * 0.07,
            }}
          >
            <Image name="weasel-pom-pom" />
          </Center>
        </Animated.View>

        <Animated.View
          style={[
            confettiStyles,
            {
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: -1,
            },
          ]}
        >
          <Image name="session-confetti" />
        </Animated.View>
      </Stack>
      <Animated.View style={[cardStyles]}>
        <Stack
          h="100%"
          backgroundColor={theme.colors.surface}
          gap={24}
          px={16}
          py={30}
          style={{
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
            alignItems: "center",
          }}
        >
          {/* <XPCard xp={sessionData?.xp} /> */}
          <Box>
            <Stack flexDirection="row" gap={4}>
              <Stack w={width * 0.6}>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Stack flexDirection="row" gap={8} alignItems="center">
                    <Icon name="colorLabelIcon-xp" size={16} />
                    <Text level="footnote" style={{ lineHeight: 19 }}>
                      You gained{" "}
                      <Text level="footnote" weight="bold">
                        {safenumber(sessionData?.xp?.final) -
                          safenumber(sessionData?.xp?.initial)}{" "}
                        XP{" "}
                      </Text>{" "}
                      in this session
                    </Text>
                  </Stack>
                </Stack>

                <View onLayout={startAnimations}>
                  <View style={[progressBarStyles.container]} />
                  <Animated.View
                    style={[
                      progressBarStyles.bar,
                      {
                        width: progressBarWidth,
                      },
                    ]}
                  />
                </View>

                <Stack flexDirection="row" justifyContent="space-between">
                  <Text level="caption_1" style={sessionXPCardStyles.caption1}>
                    Level {userLevel}
                  </Text>
                  <Text level="caption_1" style={sessionXPCardStyles.caption1}>
                    Level {Number(userLevel) + 1}
                  </Text>
                </Stack>
              </Stack>
              <Center>
                <Animated.View
                  style={{
                    opacity: levelImageOpacity,
                    transform: [
                      {
                        scale: levelImageScale,
                      },
                    ],
                  }}
                >
                  <Image
                    name={getImageNameForLevel(Number(userLevel) + 1)}
                    width={64}
                    height={64}
                    style={sessionXPCardStyles.image}
                  />
                </Animated.View>
              </Center>
            </Stack>
          </Box>

          <Stack gap={14}>
            <Text level="title_3">Here’s the summary of the session</Text>
            <Stack
              flexDirection="row"
              gap={16}
              justifyContent="space-between"
              w={"100%"}
            >
              <Stack flex={1}>
                <SessionCard
                  title="DURATION"
                  content={formatDuration(sessionData?.duration || 0)}
                  icon="hourglass-fill"
                  iconColor="#816DFF"
                />
              </Stack>
              <Stack flex={1}>
                <SessionCard
                  title="CORRECTIONS"
                  content={sessionData?.total_bad || 0}
                  icon="warning"
                  iconColor="#FFBE1B"
                />
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              gap={16}
              justifyContent="space-between"
              w={"100%"}
            >
              <Stack flex={1}>
                <SessionCard
                  title="GOOD POSTURES"
                  content={`${goodPosturePercentage} %`}
                  icon="face-happy"
                  iconColor={theme.colors.random.green}
                />
              </Stack>
              <Stack flex={1}>
                <SessionCard
                  title="BAD POSTURES"
                  content={`${badPosturePercentage} %`}
                  icon="face-sad"
                  iconColor={theme.colors.error[400]}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack w={230}>
            <Button
              onPress={() => {
                // Always get a streak yey!!
                if (levelupFinished) {
                  router.push("/streak");
                }
              }}
              variant="primary"
              title="Back Home"
            />
          </Stack>
        </Stack>
      </Animated.View>
    </Stack>
  );
};

const sessionXPCardStyles = StyleSheet.create({
  title: {
    color: theme.colors.neutral[800],
  },
  caption1: {
    color: theme.colors.neutral[400],
  },
  view: {
    marginVertical: 10,
    width: "100%",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.neutral[100],
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  image: {
    marginHorizontal: 13,
    flexShrink: 0,
  },
});

const progressBarStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.neutral[100],
  },
  bar: {
    marginVertical: 10,
    position: "absolute",
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.error[400],
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

export default SessionSummaryScreen;
