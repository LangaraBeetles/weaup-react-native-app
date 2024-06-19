import React, { useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import Button from "@src/components/ui/Button";
import DeviceMotionView from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import { globalStyles } from "@src/styles/globalStyles";
import SessionControl from "@src/components/sessions/SessionControl";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);

  const [isTrackingEnabled, setTrackingEnabled] = useState(false);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
});

export default HomePage;
