import { StyleSheet, View, Modal, Pressable } from "react-native";
import Button from "./Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { theme } from "@src/styles/theme";
import TimePicker from "./TimePicker";
import { Text } from "./typography";

const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;

const TimerDisplay: React.FC<{ timeInSeconds: number }> = ({
  timeInSeconds,
}) => {
  // const hours = Math.floor(timeInSeconds / HOUR_IN_SECONDS);
  const minutes = Math.floor(
    (timeInSeconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS,
  );
  const seconds = timeInSeconds % MINUTE_IN_SECONDS;

  return (
    <Text level="title_1" style={styles.text}>
      {/* {hours}: */}
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

const minutesData = Array.from({ length: 8 }, (_, i) =>
  (i * 10).toString(),
).slice(1, -1);

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
  const [showStartSessionModal, setShowStartSessionModal] =
    useState<boolean>(false);

  const [isTimerActive, setTimerActive] = useState<boolean>(false);

  const [timeInHours, setTimeInHours] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(0);

  const showTimeSetup = useCallback(() => {
    setShowStartSessionModal(true);
  }, []);

  const closePauseModal = () => {
    setShowStartSessionModal(false);
    setTimeInHours(0);
    setTimeInMinutes(0);
  };

  const startTimer = () => {
    if (timeInHours + timeInMinutes > 0) {
      const seconds = timeInHours * 3600 + timeInMinutes * 60;
      setTimeInSeconds(seconds);
      onStartCallback?.(seconds);
      setTimerActive(true);
      closePauseModal();
    }
  };

  const stopTimer = () => {
    setShowStopSessionModal(false);
    clearInterval(timerInterval.current);

    setTimeInSeconds(-1);
    setTimerActive(false);
    onStopCallback?.();
    closePauseModal();
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
          <View style={{ width: 225 }}>
            <Button
              title="End session"
              onPress={pauseTimer}
              variant="tertiary"
            />
          </View>
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
      >
        <Pressable style={styles.modalBackground} onPress={resumeTimer}>
          <Pressable
            style={styles.modalContainer}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
          >
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
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent={true}
        visible={showStartSessionModal}
        animationType="fade"
      >
        <Pressable
          style={styles.modalBackground}
          onPress={() => setShowStartSessionModal(false)}
        >
          <Pressable
            style={styles.modalContainer}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
          >
            <View>
              <Text level="title_3" style={{ textAlign: "center" }}>
                How long do you want the session to be?
              </Text>
              <TimePicker
                data={minutesData}
                onValueChange={(value) => setTimeInMinutes(Number(value))}
                title="minutes"
              />
            </View>
            <Button
              title="Start session"
              onPress={startTimer}
              variant="primary"
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
    zIndex: 1,
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
    zIndex: 2,
  },
  pickerColumn: {
    flexDirection: "row",
  },
});

export default Timer;
