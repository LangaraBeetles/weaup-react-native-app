import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "./Timer";
import Button from "../ui/Button";

const SessionControl = () => {
  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("STOP");
  const [timerState, setTimerState] =
    useState<SessionStatesType["TimerStatesEnum"]>("STOPPED");

  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const onInitSession = () => {
    setSessionState("INIT");
  };

  const onStartSession = (): "START" => {
    setSessionState("START");
    setTimerState("RUNNING");
    //TODO: stop real time tracking
    //TODO: set time in seconds from the setTimer component
    setTimeInSeconds(3600);
    //TODO: function to check posture every second
    //if posture is okay ➝ save it to the local state and show the image animation
    //if posture is bad ➝ save it to the local state and show the image animation
    return "START";
  };

  const onCancelSession = () => {
    setSessionState("CANCEL");
    setTimerState("STOPPED");
    setTimeInSeconds(-1);
    //TODO: start real time tracking
    //TODO: discard session data
  };

  const onStopSession = () => {
    setSessionState("PAUSE");
    setTimerState("PAUSED");
    setModalVisible(true);
  };

  const onPauseSession = () => {
    setSessionState((prevState) => (prevState === "START" ? "PAUSE" : "START"));

    setTimerState((prevState) =>
      prevState === "RUNNING" ? "PAUSED" : "RUNNING"
    );
  };

  const handleContinue = () => {
    setModalVisible(false);
    setSessionState("START");
    setTimerState("RUNNING");
  };

  const handleEndSession = () => {
    setModalVisible(false);
    setSessionState("STOP");
    setTimerState("STOPPED");
    //TODO: save session data
    //TODO: Show session summary
    alert("Here is your session summary!");
    //Reset the timer
    setTimeInSeconds(-1);
    //TODO: start real time tracking
  };

  const SetTimer = ({ onStartSession }: { onStartSession: () => void }) => (
    <View>
      <Text>Hours: 1</Text>
      <Text>Minutes: 1</Text>
      <Button
        title="Start Session"
        onPress={onStartSession}
        type={{ type: "primary", size: "s" }}
      ></Button>
      <Button
        title="X"
        onPress={onCancelSession}
        type={{ type: "primary", size: "s" }}
      ></Button>
    </View>
  );

  useEffect(() => {
    if (sessionState === "START" && timeInSeconds === -1) {
      onStopSession();
    } else if (sessionState === "START" && timeInSeconds > 0) {
      const timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeInSeconds, sessionState]);

  return (
    <View>
      {timerState === "STOPPED" && (
        <Button
          title="Start a session"
          onPress={onInitSession}
          type={{ type: "primary", size: "l" }}
        ></Button>
      )}

      {sessionState === "INIT" && <SetTimer onStartSession={onStartSession} />}

      {(sessionState === "START" || sessionState === "PAUSE") && (
        <Timer
          timeInSeconds={timeInSeconds}
          handlePause={onPauseSession}
          handleStop={onStopSession}
          isPaused={timerState === "PAUSED"}
        />
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Continue"
              onPress={handleContinue}
              type={{ type: "primary", size: "l" }}
            />
            <Button
              title="End Session"
              onPress={handleEndSession}
              type={{ type: "primary", size: "l" }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default SessionControl;
