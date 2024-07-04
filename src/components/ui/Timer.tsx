import {
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "./Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "@src/components/ui/CustomBackdrop";
import { theme } from "@src/styles/theme";
import TimePicker from "./TimePicker";
import { Text } from "./typography";

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;

const TimerDisplay: React.FC<{ timeInSeconds: number }> = ({
  timeInSeconds,
}) => {
  const hours = Math.floor(timeInSeconds / HOUR_IN_SECONDS);
  const minutes = Math.floor(
    (timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS,
  );
  const seconds = timeInSeconds % MINUTE_IN_SECONDS;

  return (
    <Text level="title_1" style={styles.text}>
      {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

const hoursData = Array.from({ length: 24 }, (_, i) => i.toString());
const minutesData = Array.from({ length: 6 }, (_, i) => (i * 10).toString());

const { width, height } = Dimensions.get("window");

const Timer = ({
  onStartCallback,
  onStopCallback,
  onPauseCallback,
  onResumeCallback,
}: {
  onStartCallback: (seconds: number) => void;
  onStopCallback?: () => void;
  onPauseCallback?: () => void;
  onResumeCallback?: () => void;
}) => {
  const timerInterval = useRef<any>();
  const [timeInSeconds, setTimeInSeconds] = useState(-1);

  const [showStopSessionModal, setShowStopSessionModal] =
    useState<boolean>(false);

  // ref for BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isTimerActive, setTimerActive] = useState<boolean>(false);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [timeInHours, setTimeInHours] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(0);

  const showTimeSetup = useCallback(() => {
    // setSessionState("INIT");
    setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 100); // Small delay to ensure state update and ref readiness
  }, []);

  const dismissBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();

    setTimeInHours(0);
    setTimeInMinutes(0);
  };

  const startTimer = () => {
    if (timeInHours + timeInMinutes > 0) {
      const seconds = timeInHours * 3600 + timeInMinutes * 60;
      setTimeInSeconds(seconds);
      onStartCallback?.(seconds);
      setTimerActive(true);
      dismissBottomSheet();
    }
  };

  const stopTimer = () => {
    setShowStopSessionModal(false);
    clearInterval(timerInterval.current);

    setTimeInSeconds(-1);
    setTimerActive(false);
    onStopCallback?.();
    dismissBottomSheet();
  };

  const pauseTimer = () => {
    setShowStopSessionModal(true);
    onPauseCallback?.();
  };

  const resumeTimer = () => {
    setShowStopSessionModal(false);
    onResumeCallback?.();
  };

  useEffect(() => {
    if (timeInSeconds > 0) {
      timerInterval.current = setInterval(
        (isPaused) => {
          if (isPaused) {
            return;
          }
          setTimeInSeconds((prevTime) => prevTime - 1);
        },
        1000,
        showStopSessionModal,
      );
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [timeInSeconds, showStopSessionModal]);

  return (
    <View>
      {isTimerActive ? (
        <View style={styles.container}>
          <TimerDisplay timeInSeconds={timeInSeconds} />
          <Button
            title="Stop tracking"
            onPress={pauseTimer}
            variant="primary"
          />
        </View>
      ) : (
        <Button
          title="Start a session"
          onPress={showTimeSetup}
          variant="secondary"
          trailingIcon="play"
        />
      )}

      <Modal
        transparent={true}
        visible={showStopSessionModal}
        animationType="fade"
        onRequestClose={resumeTimer}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Keep Going"
              onPress={resumeTimer}
              variant="primary"
            />
            <Button
              title="End Session"
              onPress={stopTimer}
              variant="secondary"
            />
          </View>
        </View>
      </Modal>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerOverlay} />
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
            <TimePicker
              data={hoursData}
              onValueChange={(value) => setTimeInHours(Number(value))}
            />
            <Text>Hours:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInHours(Number(text))}
              // value={timeInHours.toString()}
              placeholder="Hours"
              keyboardType="numeric"
              defaultValue="0"
            />
            <Text>Minutes:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setTimeInMinutes(Number(text))}
              // value={timeInMinutes.toString()}
              defaultValue="0"
              placeholder="Minutes"
              keyboardType="numeric"
            />
            <Button
              title="Start Session"
              onPress={startTimer}
              variant="primary"
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    lineHeight: 90,
    color: theme.colors.secondary[600],
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
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
    gap: 8,
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
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: height * 0.02,
    marginTop: height * -0.08,
    zIndex: -1,
  },
  pickerOverlay: {
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

export default Timer;
