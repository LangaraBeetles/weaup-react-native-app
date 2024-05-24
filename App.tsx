import React, { useEffect, useState } from "react";
import BackgroundFetch from "react-native-background-fetch";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const configureBackgroundFetch = async () => {
      BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
          // Android options
          forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
          stopOnTerminate: false,
          startOnBoot: true,
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
          requiresCharging: false, // Default
          requiresDeviceIdle: false, // Default
          requiresBatteryNotLow: false, // Default
          requiresStorageNotLow: false, // Default
        },
        async (taskId) => {
          setCounter((prevCounter) => prevCounter + 1);
          console.log("[js] Received background-fetch event: ", taskId);
          // Simulate a background task
          const now = new Date();
          console.log(`BackgroundFetch task running at ${now.toISOString()}`);
          // Required: Signal completion of your task to native code
          BackgroundFetch.finish(taskId);
        },
        (error) => {
          console.log("[js] RNBackgroundFetch failed to start", error);
        }
      );

      // Optional: Query the authorization status.
      BackgroundFetch.status((status) => {
        switch (status) {
          case BackgroundFetch.STATUS_RESTRICTED:
            console.log("BackgroundFetch restricted");
            break;
          case BackgroundFetch.STATUS_DENIED:
            console.log("BackgroundFetch denied");
            break;
          case BackgroundFetch.STATUS_AVAILABLE:
            console.log("BackgroundFetch is enabled");
            break;
        }
      });
    };

    configureBackgroundFetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Background Fetch Example</Text>
      <Text>Counter: {counter}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
