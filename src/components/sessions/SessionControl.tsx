import { View } from "react-native";
import React, { useCallback, useRef } from "react";
import Timer from "@src/components/ui/Timer";
import { useRouter } from "expo-router";
import { PostureSessionInput } from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate } = useMutation({
    mutationKey: ["save-session-data"],
    mutationFn: (payload: PostureSessionInput) => saveSessionRecords(payload),
    onSuccess: (response) => {
      const sessionId = response?.data._id;
      const sessionParams = JSON.stringify(sessionId);

      router.push({
        pathname: "/session-summary",
        params: {
          sessionParams,
          isDailyStreak: isDailyStreak ? "true" : "false",
        },
      });

      setIsDailyStreak(false);
    },
    onError: (error) => {
      console.log({ error });
      setSessionActive("INACTIVE");
    },
    onSettled: () => {
      void updateStreak;
      // updateStreak();
      // Move this logic to after the session summary
      // This is causing the level up on the summary data to be different than the result expected from the session
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

  const updateStreak = useCallback(async () => {
    const today = dayjs();

    const analyticsData = await getAnalytics(today.format());
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
      if (!today.isSame(dayjs(lastSessionDate))) {
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
  }, [userStreak, setDailyStreakCounter]);

  const onStopSession = () => {
    setSessionActive("INACTIVE");

    const records = prepareSessionPostureData();

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
        : [{ good_posture: false, recorded_at: endDate }];

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
