import { StyleSheet, Text, Button } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useUser } from "@state/useUser";
import { Box } from "@gluestack-ui/themed";
import { Redirect } from "expo-router";
import { useBackgroundTasks } from "@src/components/providers/BackgroundTasksProvider";
import { useEffect } from "react";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const setAuth = useUser((state) => state.setAuth);
  const mode = useUser((state) => state.mode);

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

  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <Box>
      <Text style={styles.text}>Home Page text</Text>
      {!!userName && <Text>Hello {userName}!</Text>}

      <Button title="Update name" onPress={onNameChange}></Button>

      <Button title="Reset setup" onPress={onNameClear}></Button>
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

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
});

export default HomePage;
