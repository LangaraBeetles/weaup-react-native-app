import { StyleSheet, View, Text, Button, Alert } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useUser } from "@state/useUser";
import { Box } from "@gluestack-ui/themed";
import { useBackgroundTasks } from "@src/components/providers/BackgroundTasksProvider";

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
});

const HomePage = () => {
  const userName = useUser((state) => state.user.name);
  const setAuth = useUser((state) => state.setAuth);

  //TODO: add rest of the params
  const { isTrackingEnabled, setTrackingEnabled } =
    useBackgroundTasks();

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

  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  return (
    <Box>
      <Text style={styles.text}>Home Page text</Text>
      {!!userName && <Text>Hello {userName}!</Text>}

      <Button title="Update name" onPress={onNameChange}></Button>

      <Button title="Clear name" onPress={onNameClear}></Button>

      <Button
        title={
          isTrackingEnabled
            ? "Disable Background Fetch"
            : "Enable Background Fetch"
        }
        onPress={toggleBackgroundFetch}
      />
    </Box>
  );
};

export default HomePage;
