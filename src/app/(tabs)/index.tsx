import { StyleSheet, Text, Modal, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useUser } from "@state/useUser";
import { Box, HStack } from "@gluestack-ui/themed";
import { Redirect } from "expo-router";
import { useBackgroundTasks } from "@src/components/providers/BackgroundTasksProvider";
import Button from '@src/components/ui/Button';
import DeviceMotionView from "@src/components/ui/DeviceMotionView";

import { useEffect, useState } from "react";
import {
  SessionStatesEnum,
  TimerStatesEnum,
} from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const setAuth = useUser((state) => state.setAuth);
  const [sessionState, setSessionState] = useState(SessionStatesEnum.STOP);
  const [timerState, setTimerState] = useState(TimerStatesEnum.STOPPED);
  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  //TODO: add rest of the params
  const { isTrackingEnabled, setTrackingEnabled } = useBackgroundTasks();

  //TODO: remove this function
  const onNameChange = () => {
    setAuth(true, {
      deviceIds: ["1"],
      currentDeviceId: "1",
      dailyGoal: 80,
      name: "Dr Seuss",
    });
  };

  const onNameClear = () => {
    setAuth(false, {
      deviceIds: [],
      currentDeviceId: null,
      dailyGoal: 80,
      name: "",
    });
  };

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }
  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  const onInitSession = () => {
    setSessionState(SessionStatesEnum.INIT);
  };

  const onStartSession = () => {
    setSessionState(SessionStatesEnum.START);
    setTimerState(TimerStatesEnum.RUNNING);
    //TODO: stop real time tracking
    //TODO: set time in seconds from the setTimer component
    setTimeInSeconds(3600);
    //TODO: function to check posture every second
    //if posture is okay ➝ save it to the local state and show the image animation
    //if posture is bad ➝ save it to the local state and show the image animation
  };

  const onCancelSession = () => {
    setSessionState(SessionStatesEnum.CANCEL);
    setTimerState(TimerStatesEnum.STOPPED);
    setTimeInSeconds(-1);
    //TODO: start real time tracking
    //TODO: discard session data
  };

  const onStopSession = () => {
    setSessionState(SessionStatesEnum.PAUSE);
    setTimerState(TimerStatesEnum.PAUSED);
    setModalVisible(true);
  };

  const onPauseSession = () => {
    setSessionState((prevState) =>
      prevState === SessionStatesEnum.START
        ? SessionStatesEnum.PAUSE
        : SessionStatesEnum.START
    );

    setTimerState((prevState) =>
      prevState === TimerStatesEnum.RUNNING
        ? TimerStatesEnum.PAUSED
        : TimerStatesEnum.RUNNING
    );
  };

  const handleContinue = () => {
    setModalVisible(false);
    setSessionState(SessionStatesEnum.START);
    setTimerState(TimerStatesEnum.RUNNING);
  };

  const handleEndSession = () => {
    setModalVisible(false);
    setSessionState(SessionStatesEnum.STOP);
    setTimerState(TimerStatesEnum.STOPPED);
    //TODO: save session data
    //TODO: Show session summary
    alert("Here is your session summary!");
    //Reset the timer
    setTimeInSeconds(-1);
    //TODO: start real time tracking
  };

  const SetTimer = ({ onStartSession }: { onStartSession: () => void }) => (
    <Box>
      <HStack>
        <Text>Hours: 1</Text>
        <Text>Minutes: 1</Text>
      </HStack>
      <Button title="Start Session" onPress={onStartSession} type={{type: "primary", size:"s"}}></Button>
      <Button title="X" onPress={onCancelSession} type={{type: "primary", size:"s"}}></Button>
    </Box>
  );

  useEffect(() => {
    if (sessionState === SessionStatesEnum.START && timeInSeconds === -1) {
      onStopSession();
    } else if (sessionState === SessionStatesEnum.START && timeInSeconds > 0) {
      const timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeInSeconds, sessionState]);

  return (
    <Box>
      <Text style={styles.text}>Home Page text</Text>
      {!!userName && <Text>Hello {userName}!</Text>}

      <Button title="Update name" onPress={onNameChange} type={{type: "primary", size:"l"}}></Button>
      <Button title="Reset setup" onPress={onNameClear} type={{type: "primary", size:"l"}}></Button>
      <Button title="Clear name" onPress={onNameClear} type={{type: "primary", size:"l"}}></Button>

      <Button
        title={
          isTrackingEnabled
            ? "Disable Tracking"
            : "Enable Tracking"
        }
        onPress={toggleBackgroundFetch}
        type={{type: "secondary", size:"s"}}
      />

      <Button title="Start Session" onPress={onInitSession} type={{type: "primary", size:"l"}}></Button>
      {sessionState === SessionStatesEnum.INIT && (
        <SetTimer onStartSession={onStartSession} />
      )}
      {(sessionState === SessionStatesEnum.START ||
        sessionState === SessionStatesEnum.PAUSE) && (
        <Timer
          timeInSeconds={timeInSeconds}
          handlePause={onPauseSession}
          handleStop={onStopSession}
          isPaused={timerState === TimerStatesEnum.PAUSED}
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
            <Button title="Continue" onPress={handleContinue} type={{type: "primary", size:"l"}} />
            <Button title="End Session" onPress={handleEndSession} type={{type: "primary", size:"l"}} />
          </View>
        </View>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
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
});

export default HomePage;
