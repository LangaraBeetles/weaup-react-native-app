import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import Button from "./Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { theme } from "@src/styles/theme";
import TimePicker from "./TimePicker";
import { Text } from "./typography";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height } = Dimensions.get("screen");

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
  isTimerActive: isActive,
  onStartCallback,
  onStopCallback,
  onPauseCallback,
  onResumeCallback,
}: {
  isTimerActive: boolean;
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

  const [isTimerActive, setTimerActive] = useState<boolean>(isActive);

  const [timeInHours, setTimeInHours] = useState(0);
  const [timeInMinutes, setTimeInMinutes] = useState(0);

  const showTimeSetup = useCallback(() => {
    setShowStartSessionModal(true);
    timerModalY.value = withRepeat(withSpring(0, { stiffness: 100 }), 1, true);
  }, []);

  const hideTimeSetup = useCallback(() => {
    {
      timerModalY.value = withTiming(
        height / 2,
        { duration: 150 },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setShowStartSessionModal)(false);
          }
        },
      );
    }
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
    timerModalY.value = height / 2;
    endSessionModalY.value = height / 2;
    setShowStopSessionModal(false);
    clearInterval(timerInterval.current);

    setTimeInSeconds(-1);
    setTimerActive(false);
    onStopCallback?.();
    closePauseModal();
  };

  const pauseTimer = () => {
    setShowStopSessionModal(true);
    endSessionModalY.value = withRepeat(
      withSpring(0, { stiffness: 100 }),
      1,
      true,
    );
    onPauseCallback?.();
  };

  const resumeTimer = () => {
    endSessionModalY.value = withTiming(
      height / 2,
      { duration: 150 },
      (isFinished) => {
        if (isFinished) {
          runOnJS(setShowStopSessionModal)(false);
          runOnJS(resumeCallback)();
        }
      },
    );
  };

  const resumeCallback = () => {
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

  const timerModalY = useSharedValue(height / 2);
  const animatedTimerModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: timerModalY.value }],
  }));

  const endSessionModalY = useSharedValue(height / 2);
  const animatedEndSessionModalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: endSessionModalY.value }],
  }));

  return (
    <View>
      {isTimerActive ? (
        <View
          style={{
            marginTop: height < 850 && Platform.OS == "android" ? -25 : 30,
            ...styles.container,
          }}
        >
          <TimerDisplay timeInSeconds={timeInSeconds} />
          <View style={{ width: 225 }}>
            <Button
              title="End Session"
              onPress={pauseTimer}
              variant="secondary_coral"
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
          <Animated.View style={[animatedEndSessionModalStyle]}>
            <Pressable
              style={styles.modalContainer}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              <View style={{ paddingHorizontal: "10%" }}>
                <Text level="title_3" align="center">
                  Are you sure you want to end the session?
                </Text>
              </View>
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
          </Animated.View>
        </Pressable>
      </Modal>

      <Modal transparent={true} visible={showStartSessionModal}>
        <Pressable style={styles.modalBackground} onPress={hideTimeSetup}>
          <Animated.View style={[animatedTimerModalStyle]}>
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
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },
  text: {
    fontSize: 60,
    lineHeight: 80,
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
    borderRadius: 18,
    alignItems: "center",
    gap: 16,
    zIndex: 2,
  },
  pickerColumn: {
    flexDirection: "row",
  },
});

export default Timer;
