import { View } from "react-native";
import React, { useRef } from "react";
import Timer from "@src/components/ui/Timer";
import { useRouter } from "expo-router";
import { PostureSessionInput } from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";
import { useMutation } from "@tanstack/react-query";

const SessionControl = () => {
  const router = useRouter();
  const startDate = useRef<string>("");

  const userHP = useUser((state) => state.user.hp);
  const userXP = useUser((state) => state.user.xp);

  const initialXP = useRef<number>(userXP);

  const setDailyStreakCounter = useUser((state) => state.setDailyStreakCounter);

  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const [isDailyStreak, setIsDailyStreak] = React.useState(true);

  const setSessionActive = useUser((state) => state.setSessionStatus);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const prepareSessionPostureData = useUser(
    (state) => state.prepareSessionPostureData,
  );

  // TODO: update daily streak counter logic
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const today = dayjs();
  //       console.log("Fetching analytics for:", today.format());
  //       const analyticsData = await getAnalytics(today.format());

  //       if (
  //         !analyticsData ||
  //         !analyticsData.sessions ||
  //         analyticsData.sessions.length === 0
  //       ) {
  //         console.log("No previous sessions, start a new streak");
  //         setIsDailyStreak(true);
  //         setDailyStreakCounter(1);
  //         return;
  //       }

  //       console.log("Previous sessions found");
  //     } catch (error) {
  //       console.log("Failed to fetch analytics data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const { mutate } = useMutation({
    mutationKey: ["save-session-data"],
    mutationFn: (payload: PostureSessionInput) => saveSessionRecords(payload),
    onSuccess: (response) => {
      const sessionId = response?.data._id;

      if (userStreak === 0) {
        setDailyStreakCounter(1);
      } else if (userStreak < 7) {
        setDailyStreakCounter(userStreak + 1);
      } else if (userStreak === 7) {
        setDailyStreakCounter(1);
      }

      setIsDailyStreak(true);

      router.push({
        pathname: "/session-summary",
        params: {
          sessionId,
          isDailyStreak: isDailyStreak.toString(),
        },
      });

      // setIsDailyStreak(false);
    },
    onError: (error) => {
      console.log({ error });
      setSessionActive("INACTIVE");
    },
    onSettled: () => {},
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
