import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import BackgroundFetchScreen from "./components/BackgroundFetchScreen";
import { useState, useEffect } from "react";

const BACKGROUND_FETCH_TASK = "task1";

let counter = 0;

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log(`Background fetch called`);
  counter += 1;

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export default function App() {
  const [fetchCounter, setFetchCounter] = useState(counter);

  // Update the fetchCounter state every second to reflect the latest counter value
  useEffect(() => {
    const interval = setInterval(() => {
      setFetchCounter(counter);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundFetchScreen
        backgroundFetchTask={BACKGROUND_FETCH_TASK}
        counter={fetchCounter}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
