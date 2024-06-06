import { Button, StyleSheet, Text, View } from "react-native";

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
    <Text>
      {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  );
};

const Timer: React.FC<{
  timeInSeconds: number;
  handlePause: () => void;
  handleReset: () => void;
  isPaused: () => void;
  handleStop: () => void;
}> = ({ timeInSeconds, handlePause, handleReset, isPaused, handleStop }) => {
  return (
    <View style={styles.container}>
      <TimerDisplay timeInSeconds={timeInSeconds} />
      {/* TODO: remove pause/resume button */}
      <Button title={isPaused() ? "Resume" : "Pause"} onPress={handlePause} />
      {/* TODO: remove reset button */}
      <Button title="Reset" onPress={handleReset} />
      <Button title="Stop" onPress={handleStop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
  },
});

export default Timer;
