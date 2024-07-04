import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "./Button";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "@src/components/ui/CustomBackdrop";

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;

const TimerDisplay: React.FC<{ timeInSeconds: number }> = ({
  timeInSeconds,
}) => {
  const hours = Math.floor(timeInSeconds / HOUR_IN_SECONDS);
  const minutes = Math.floor(
    (timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS
  );
  const seconds = timeInSeconds % MINUTE_IN_SECONDS;

  return (
    <Text style={styles.text}>
      {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

const Timer = ({
  onStartCallback,
  onStopCallback,
}: {
  onStartCallback: (seconds: number) => void;
  onStopCallback?: () => void;
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
    console.log({ timeInHours, timeInMinutes });
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

    setTimeout(() => {
      setTimeInSeconds(-1);
      setTimerActive(false);
      onStopCallback?.();
      dismissBottomSheet();
    }, 600);
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
        showStopSessionModal
      );
    } else {
      stopTimer();
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
            onPress={() => setShowStopSessionModal(true)}
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
        onRequestClose={() => setShowStopSessionModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Keep Going"
              onPress={() => setShowStopSessionModal(false)}
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
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
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
});

export default Timer;
