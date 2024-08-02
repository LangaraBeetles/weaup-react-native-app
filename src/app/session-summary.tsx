import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, Dimensions, ActivityIndicator } from "react-native";
import XPCard from "@src/components/sessions/SessionXPCard";
import SessionCard from "@src/components/sessions/SessionCard";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";
// import { useLevelSystem } from "@src/components/providers/LevelSystemProvider";
import { getSessionById } from "@src/services/sessionApi";
import { useQuery } from "@tanstack/react-query";

const { height } = Dimensions.get("window");

const SessionSummaryScreen: React.FC = () => {
  // const { unlockedLevels, showLevelUpModal } = useLevelSystem();
  const { sessionId, isDailyStreak } = useLocalSearchParams<{
    sessionId: string;
    isDailyStreak: "true" | "false";
  }>();

  const { isLoading, data } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionById(sessionId ?? ""),
    enabled: !!sessionId,
  });

  const sessionData = data?.data;

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes ?? 0).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handlePress = () => {
    // if (unlockedLevels.length) {
    //   // trigger this after animations

    //   showLevelUpModal();
    //   return;
    // }

    if (isDailyStreak === "true") {
      router.push("/streak");

      return;
    }

    router.push({
      pathname: "/",
    });
  };

  const totalRecords = sessionData?.total_records || 0;
  const goodPosturePercentage = totalRecords
    ? Math.round(((sessionData?.total_good || 0) / totalRecords) * 100)
    : 0;
  const badPosturePercentage = totalRecords
    ? Math.round(((sessionData?.total_bad || 0) / totalRecords) * 100)
    : 0;

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
        <Stack style={{ flex: 1 }}>
          <Stack h={height * 0.3}>
            <Center gap={4} style={{ top: height * 0.05 }}>
              <Text level="body">You did a great job! 🎉</Text>
              <Text level="title_2">
                Your posture score is: {goodPosturePercentage}
              </Text>
            </Center>
            <Center
              w={131}
              h={258}
              style={{
                marginHorizontal: "auto",
                marginTop: height * 0.1,
              }}
            >
              <Image name="weasel-happy" />
            </Center>
          </Stack>
          <Stack
            h={"100%"}
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
            <XPCard xp={sessionData?.xp} />

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
                onPress={handlePress}
                variant="primary"
                title="Back Home"
              />
            </Stack>
          </Stack>
        </Stack>
      )}
    </SafeAreaView>
  );
};

export default SessionSummaryScreen;
