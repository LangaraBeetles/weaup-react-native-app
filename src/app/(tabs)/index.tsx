import { StyleSheet, View, Text, Alert } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useUser } from "@state/useUser";
import { Box } from "@gluestack-ui/themed";
import { Redirect } from "expo-router";
import { useBackgroundTasks } from "@src/components/providers/BackgroundTasksProvider";
import Button from '@src/components/ui/Button';

import DeviceMotionView from "@src/components/ui/DeviceMotionView";

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
});

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
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

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }
  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  return (
    <Box>
      <Text style={styles.text}>Home Page text</Text>
      {!!userName && <Text>Hello {userName}!</Text>}

      <Button title="Update name" onPress={onNameChange} type={{type: "primary", size:"s"}}></Button>

      <Button title="Reset setup" onPress={onNameClear} type={{type: "primary", size:"l"}}></Button>
      <Button title="Clear name" onPress={onNameClear} type={{type: "secondary", size:"l"}}></Button>

      <Button
        title={
          isTrackingEnabled
            ? "Disable Tracking"
            : "Enable Tracking"
        }
        onPress={toggleBackgroundFetch}
        type={{type: "secondary", size:"s"}}
      />
      <DeviceMotionView/>
    </Box>
  );
};

export default HomePage;
