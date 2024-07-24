import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Dimensions } from "react-native";
import XPCard from "@src/components/sessions/SessionXPCard";
import SessionCard from "@src/components/sessions/SessionCard";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";
import { useLevelSystem } from "@src/components/providers/LevelSystemProvider";
import { getSessionById } from "@src/services/sessionApi";

const { height } = Dimensions.get("window");

interface PostureRecord {
  good_posture: boolean;
  recorded_at: string;
}

interface SessionData {
  __v: number;
  _id: string;
  createdAt: string;
  duration: number;
  ended_at: string;
  records: PostureRecord[];
  score: number;
  started_at: string;
  total_bad: number;
  total_good: number;
  total_records: number;
  updatedAt: string;
  user_id: string;
  xp: {
    initial: number;
    final: number;
  };
}

const SessionSummaryScreen: React.FC = () => {
  const { unlockedLevels, showLevelUpModal } = useLevelSystem();
  const { sessionParams, isDailyStreak } = useLocalSearchParams<{
    sessionParams: string;
    isDailyStreak: "true" | "false";
  }>();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (minutes == 0) {
      return "< 1 min";
    }
    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
  };

  const handlePress = () => {
    if (unlockedLevels.length) {
      // trigger this after animations

      showLevelUpModal();
      return;
    }

    if (isDailyStreak === "true") {
      router.push("/streak");

      return;
    }

    router.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    if (sessionParams) {
      try {
        const sessionId = sessionParams;

        const fetchSessionData = async () => {
          try {
            const data = await getSessionById(sessionId.replace(/"/g, ""));
            setSessionData(data.data);
          } catch (error) {
            console.log("Failed to fetch session data:", error);
          }
        };

        fetchSessionData();
      } catch (error) {
        console.log("Failed to parse session params:", error);
      }
    }
  }, [sessionParams]);

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
            <Button onPress={handlePress} variant="primary" title="Back Home" />
          </Stack>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

export default SessionSummaryScreen;
