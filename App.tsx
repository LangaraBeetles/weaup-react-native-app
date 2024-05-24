import React, { useEffect, useState } from "react";
import BackgroundFetch from "react-native-background-fetch";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [counter, setCounter] = useState(0);

  const initBackgroundFetch = async () => {
    try {
      const status: number = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // 15 minutes minimum
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          forceAlarmManager: false,
          requiresCharging: false,
          requiresDeviceIdle: false,
          requiresBatteryNotLow: false,
          requiresStorageNotLow: false,
        },
        async (taskId: string) => {
          //This is the background fetch callback
          setCounter((prevCounter) => prevCounter + 1);
          console.log("[BackgroundFetch] taskId", taskId);
          BackgroundFetch.finish(taskId);
        },
        (taskId: string) => {
          console.log("[Fetch] TIMEOUT taskId:", taskId);
          BackgroundFetch.finish(taskId);
        }
      );
      console.log("BackgroundFetch configured successfully:", status);
    } catch (error) {
      console.error("BackgroundFetch configuration error:", error);
    }
  };


  useEffect(() => {
    initBackgroundFetch();
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
