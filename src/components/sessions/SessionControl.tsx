import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";
import Button from "@src/components/ui/Button";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "@src/components/ui/CustomBackdrop";
import { useRouter } from "expo-router";
import TimePicker from "../ui/TimePicker";
import { Text } from "../ui/typography/index";
import Center from "../ui/Center";
import Stack from "../ui/Stack";

const { width, height } = Dimensions.get("window");

const SessionControl: React.FC = () => {
  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("STOP");
  const [timerState, setTimerState] =
    useState<SessionStatesType["TimerStatesEnum"]>("STOPPED");

  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  // ref for BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setSessionState("INIT");
    setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 100); // Small delay to ensure state update and ref readiness
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const onStartSession = (timeInHours: number, timeInMinutes: number) => {
    setSessionState("START");
    setTimerState("RUNNING");
    setTimeInSeconds(timeInHours * 3600 + timeInMinutes * 60);
    handleDismissModalPress();
  };

  const onStopSession = () => {
    setSessionState("PAUSE");
    setTimerState("PAUSED");
    setModalVisible(true);
  };

  const onPauseSession = () => {
    setSessionState((prevState) => (prevState === "START" ? "PAUSE" : "START"));
    setTimerState((prevState) =>
      prevState === "RUNNING" ? "PAUSED" : "RUNNING",
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
    router.push("/session-summary");
    setTimeInSeconds(-1);
  };

  const SetTimer = ({
    onStartSession,
  }: {
    onStartSession: (timeInHours: number, timeInMinutes: number) => void;
  }) => {
    const [timeInHours, setTimeInHours] = useState(0);
    const [timeInMinutes, setTimeInMinutes] = useState(0);

    const hoursData = Array.from({ length: 24 }, (_, i) => i.toString());
    const minutesData = Array.from({ length: 6 }, (_, i) =>
      (i * 10).toString(),
    );

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.bottomSheetContainer}>
            <Center>
              <View style={styles.pickerTitle}>
                <Text level="title_3" align="center">
                  How long do you want the session to be?
                </Text>
              </View>
            </Center>
            <View style={styles.pickerContainer}>
              <View style={styles.overlay} />
              <View style={styles.pickerColumn}>
                <TimePicker
                  data={hoursData}
                  onValueChange={(value) => setTimeInHours(Number(value))}
                />
                <Text level="title_3" align="center" style={styles.pickerLabel}>
                  hours
                </Text>
              </View>
              <View style={styles.pickerColumn}>
                <TimePicker
                  data={minutesData}
                  onValueChange={(value) => setTimeInMinutes(Number(value))}
                />
                <Text level="title_3" align="center" style={styles.pickerLabel}>
                  mins
                </Text>
              </View>
            </View>
            <View style={styles.button}>
              <Button
                title="Start Session"
                onPress={() => onStartSession(timeInHours, timeInMinutes)}
                variant="primary"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    );
  };

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
          onPress={handlePresentModalPress}
          variant="secondary"
          trailingIcon="play"
        />
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
            <Stack gap={24}>
              <Text>Are you sure you want to end the session?</Text>
              <Stack gap={16}>
                <Button
                  title="Keep Going"
                  onPress={handleContinue}
                  variant="primary"
                />
                <Button
                  title="End Session"
                  onPress={handleEndSession}
                  variant="secondary"
                />
              </Stack>
            </Stack>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  bottomSheetContainer: {
    paddingHorizontal: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: height * 0.02,
    marginTop: height * -0.08,
    zIndex: -1,
  },
  pickerColumn: {
    flexDirection: "row",
    gap: width * 0.02,
    alignItems: "center",
    marginHorizontal: width * 0.1,
  },
  pickerTitle: {
    paddingBottom: height * 0.02,
    backgroundColor: "white",
    marginHorizontal: width * 0.1,
  },
  pickerLabel: {
    marginLeft: width * 0.04,
  },
  button: {
    marginTop: height * 0.02,
    height: 56,
  },
  overlay: {
    position: "absolute",
    top: 83,
    left: width * 0.025,
    right: width * 0.025,
    height: height * 0.06,
    backgroundColor: "#FDD4625A",
    borderRadius: 10,
    zIndex: 1,
  },
});

export default SessionControl;
