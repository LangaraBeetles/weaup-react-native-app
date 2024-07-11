import { View } from "react-native";
import React, { useCallback, useRef } from "react";
import Timer from "@src/components/ui/Timer";
import { useRouter } from "expo-router";
import { PostureSessionInput } from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@src/services/analyticsApi";
import dayjs from "dayjs";

const SessionControl = () => {
  const router = useRouter();
  const startDate = useRef<string>("");

  const userHP = useUser((state) => state.user.hp);

  const userXP = useUser((state) => state.user.xp);
  const setUserXP = useUser((state) => state.setXP);

  const initialXP = useRef<number>(userXP);

  const setDailyStreakCounter = useUser((state) => state.setDailyStreakCounter);
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const [isDailyStreak, setIsDailyStreak] = React.useState(false);

  const setSessionActive = useUser((state) => state.setSessionStatus);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const prepareSessionPostureData = useUser(
    (state) => state.prepareSessionPostureData,
  );

  const dayFilter = dayjs().format();

  const { data: analyticsData, refetch: refetchAnalytics } = useQuery({
    queryKey: ["analytics", dayFilter],
    queryFn: () => getAnalytics(dayFilter),
    enabled: !!dayFilter && dayFilter != "",
  });

  const { mutate } = useMutation({
    mutationKey: ["save-session-data"],
    mutationFn: (payload: PostureSessionInput) => saveSessionRecords(payload),
    onSuccess: (response) => {
      const session = response;
      const sessionParams = JSON.stringify(session);
      setTimeout(() => {
        if (isDailyStreak) {
          router.push({
            pathname: "/streak",
            params: { sessionParams },
          });
        } else {
          router.push({
            pathname: "/session-summary",
            params: { sessionParams },
          });
        }
      }, 500);
    },
    onError: (error) => {
      console.log({ error });
      setSessionActive("INACTIVE");
    },
    onSettled: () => {
      refetchAnalytics();
    },
  });

  const onStartSession = () => {
    setSessionActive("ACTIVE");
    startDate.current = new Date().toISOString();
  };

  const onPauseSession = () => {
    setSessionActive("PAUSED");
  };

  const onResumeSession = () => {
    setSessionActive("ACTIVE");
  };

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();

    if (
      !analyticsData ||
      !analyticsData.sessions ||
      analyticsData.sessions.length === 0
    ) {
      console.log("No previous sessions, start a new streak");
      // No previous sessions, start a new streak
      setIsDailyStreak(true);
      setUserXP(userXP + 100);
      setDailyStreakCounter(1);
      return;
    }

    const lastSession =
      analyticsData.sessions[analyticsData.sessions.length - 1];
    const lastSessionDate = lastSession?.ended_at;

    if (lastSessionDate) {
      const lastSessionDay = new Date(lastSessionDate).toDateString();

      if (today !== lastSessionDay) {
        console.log("New day, increment streak");

        // New day, increment streak
        setIsDailyStreak(true);
        if (userStreak === 7) {
          setUserXP(userXP + 1000);
          setDailyStreakCounter(1);
        } else {
          setUserXP(userXP + 100);
          setDailyStreakCounter(userStreak + 1);
        }
      } else {
        console.log("Same day, maintain streak");

        // Same day, maintain streak
        setIsDailyStreak(false);
        setDailyStreakCounter(userStreak);
      }
    }
  }, [analyticsData, userStreak, setDailyStreakCounter]);

  const onStopSession = () => {
    setSessionActive("INACTIVE");

    const records = prepareSessionPostureData();

    updateStreak();

    const endDate = new Date().toISOString();

    // Added so if there are no readings it doesn't send an empty array and get axios error
    const updatedRecords: Array<{
      good_posture: boolean;
      recorded_at: string;
    }> =
      records && records.length > 0
        ? records.map((data) => ({
            good_posture: data.status === "good",
            recorded_at: data?.date?.toISOString?.(),
          }))
        : [];

    const payload: PostureSessionInput = {
      started_at: startDate.current,
      ended_at: endDate,
      score: userHP ?? 0,
      dailyStreakCounter: userStreak ?? 0,
      records: updatedRecords,
      xp: {
        initial: initialXP.current,
        final: userXP,
      },
    };

    mutate(payload);
  };

  return (
    <View>
      {/* <Text level="subhead" align="center">
        {isPending ? "Saving..." : null}
      </Text> */}

      <Timer
        isTimerActive={sessionStatus !== "INACTIVE"}
        onStartCallback={onStartSession}
        onStopCallback={onStopSession}
        onPauseCallback={onPauseSession}
        onResumeCallback={onResumeSession}
      />
    </View>
  );
};

export default SessionControl;
