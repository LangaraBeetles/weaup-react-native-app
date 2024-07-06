import { View } from "react-native";
import React, { useRef } from "react";
import Timer from "@src/components/ui/Timer";
import { useRouter } from "expo-router";
import { PostureSessionInput } from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";
import { useMutation } from "@tanstack/react-query";
import { Text } from "@src/components/ui/typography";

const SessionControl = () => {
  const router = useRouter();
  const startDate = useRef<string>("");

  const setSessionActive = useUser((state) => state.setSessionStatus);
  const prepareSessionPostureData = useUser(
    (state) => state.prepareSessionPostureData,
  );

  const { isPending, mutate } = useMutation({
    mutationKey: ["save-session-data"],
    mutationFn: (payload: PostureSessionInput) => saveSessionRecords(payload),
    onSuccess: () => {
      setTimeout(() => {
        router.push("/session-summary");
      }, 500);
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
    const payload: PostureSessionInput = {
      started_at: startDate.current,
      ended_at: new Date().toISOString(),
      records: records?.map((data) => ({
        good_posture: data.status === "good",
        recorded_at: data?.date?.toISOString?.(),
      })),
    };

    mutate(payload);
  };

  return (
    <View>
      <Text level="subhead" align="center">
        {isPending ? "Saving..." : null}
      </Text>

      <Timer
        onStartCallback={onStartSession}
        onStopCallback={onStopSession}
        onPauseCallback={onPauseSession}
        onResumeCallback={onResumeSession}
      />
    </View>
  );
};

export default SessionControl;
