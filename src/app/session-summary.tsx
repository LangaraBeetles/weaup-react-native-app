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
}

interface SessionParams {
  data: SessionData;
  error: null | string;
}

const SessionSummaryScreen: React.FC = () => {
  const { sessionParams } = useLocalSearchParams<{ sessionParams: string }>();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (sessionParams) {
      try {
        const parsedParams: SessionParams = JSON.parse(sessionParams);
        const data = parsedParams.data;
        setSessionData(data);
      } catch (error) {
        console.error("Failed to parse session params:", error);
      }
    }
  }, [sessionParams]);

  const handlePress = () => {
    router.push({
      pathname: "/",
    });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.primary[200], flex: 1 }}
    >
      <Stack style={{ flex: 1 }}>
        <Stack h={height * 0.3}>
          <Center gap={4} style={{ top: height * 0.05 }}>
            <Text level="body">You did a great job! 🎉</Text>
            <Text level="title_2">
              Your posture score is: {sessionData?.score}
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
          <XPCard />

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
                  icon="colorLabelIcon-hourglass"
                />
              </Stack>
              <Stack flex={1}>
                <SessionCard
                  title="CORRECTIONS"
                  content={sessionData?.total_records || 0}
                  icon="colorLabelIcon-warning"
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
                  content={sessionData?.total_good || 0}
                  icon="colorLabelIcon-face-happy"
                />
              </Stack>
              <Stack flex={1}>
                <SessionCard
                  title="BAD POSTURES"
                  content={sessionData?.total_bad || 0}
                  icon="colorLabelIcon-face-sad"
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
