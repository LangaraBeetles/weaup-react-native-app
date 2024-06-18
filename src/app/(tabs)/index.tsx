import React, { useState } from "react";

import { StyleSheet, Text } from "react-native";
import { Box } from "@gluestack-ui/themed";
import { Redirect } from "expo-router";
import Button from "@src/components/ui/Button";
import DeviceMotionView from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

// import { usePushNotifications } from "@src/components/providers/PushNotificationsProvider";
import { globalStyles } from "@src/styles/globalStyles";
import SessionControl from "@src/components/sessions/SessionControl";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  // const setAuth = useUser((state) => state.setAuth);

  const [isTrackingEnabled, setTrackingEnabled] = useState(false);

  // const { sendPushNotification } = usePushNotifications();

  // const onNameChange = () => {
  //   setAuth(true, {
  //     deviceIds: ["1"],
  //     currentDeviceId: "1",
  //     dailyGoal: 80,
  //     name: "Dr Seuss",
  //   });
  // };

  // const onNameClear = () => {
  //   setAuth(false, {
  //     deviceIds: [],
  //     currentDeviceId: null,
  //     dailyGoal: 80,
  //     name: "",
  //   });
  // };

  // const handleSendNotification = async () => {
  //   await sendPushNotification({
  //     title: "Devs say:",
  //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  //   });
  // };

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

      <Button
        title={
          isTrackingEnabled
            ? "Disable Realtime Tracking"
            : "Enable Realtime Tracking"
        }
        onPress={toggleBackgroundFetch}
        type={{ type: "secondary", size: "l" }}
      />

      <SessionControl />
      <DeviceMotionView isTrackingEnabled={isTrackingEnabled} />
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
