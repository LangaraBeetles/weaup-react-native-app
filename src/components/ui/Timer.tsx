import { StyleSheet } from "react-native";
import Button from "./Button";
import { Text } from "./typography";
import Stack from "./Stack";
// import Center from "./Center";
import { theme } from "@src/styles/theme";

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

const Timer: React.FC<{
  timeInSeconds: number;
  handlePause: () => void;
  handleStop: () => void;
  isPaused: boolean;
}> = ({ timeInSeconds, handleStop }) => {
  return (
    <Stack alignItems="center">
      <TimerDisplay timeInSeconds={timeInSeconds} />
      <Stack w={230}>
        <Button title="End session" onPress={handleStop} variant="tertiary" />
      </Stack>
    </Stack>
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
});

export default Timer;
