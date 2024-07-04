import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";
import { useRouter } from "expo-router";
import {
  PostureSessionInput,
  PostureSessionRecord,
} from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";
import { useMutation } from "@tanstack/react-query";
import { Text } from "@src/components/ui/typography";

const SessionControl = () => {
  const sessionInterval = useRef<any>();
  const router = useRouter();

  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("INACTIVE");

  const sessionData = useRef<{
    startDate: string;
    records: Array<PostureSessionRecord>;
  }>({
    startDate: "",
    records: [],
  });

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
    },
  });

  const currentPosture = useUser((state) => state.currentPosture);
  const setSessionActive = useUser((state) => state.setSessionActive);

  const onStartSession = () => {
    setSessionState("ACTIVE");
    setSessionActive(true);
    sessionData.current = {
      startDate: new Date().toISOString(),
      records: [],
    };
  };

  const onPauseSession = () => {
    setSessionState("PAUSED");
    setSessionActive(false);
  };

  const onResumeSession = () => {
    setSessionState("ACTIVE");
    setSessionActive(true);
  };

  const onStopSession = () => {
    setSessionState("INACTIVE");
    setSessionActive(false);

    const payload: PostureSessionInput = {
      started_at: sessionData.current.startDate,
      ended_at: new Date().toISOString(),
      records: sessionData.current.records,
    };

    mutate(payload);
  };

  useEffect(() => {
    const checkPosture = (_posture: any) => {
      console.log("[SESSION] Checking posture", _posture);
      const posture = {
        good_posture: _posture === "good",
        recorded_at: new Date().toISOString(),
      };
      sessionData.current.records.push(posture);
    };

    if (sessionState === "ACTIVE") {
      sessionInterval.current = setInterval(
        (_posture) => {
          if (_posture === "good" || _posture === "bad") {
            checkPosture(_posture);
          }
        },
        2000,
        currentPosture,
      );
    }

    if (sessionState === "INACTIVE") {
      if (sessionInterval.current) {
        clearInterval(sessionInterval.current);
      }
    }

    return () => {
      if (sessionInterval.current) {
        clearInterval(sessionInterval.current);
      }
    };
  }, [sessionState, currentPosture, sessionInterval]);

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
