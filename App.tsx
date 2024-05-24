import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import HeadphoneMotionManager from "./src/modules/HeadphoneMotionManager";

export default function App() {
  const [pitch, setPitch] = useState<number | null>(null);

  const startMotionUpdates = () => {
    HeadphoneMotionManager.startUpdates();
  };

  const stopMotionUpdates = () => {
    HeadphoneMotionManager.stopUpdates();
  };

  return (
    <View>
      <Button title="Start Motion Updates" onPress={startMotionUpdates} />
      <Button title="Stop Motion Updates" onPress={stopMotionUpdates} />
      {pitch !== null && <Text>Pitch: {pitch}</Text>}
    </View>
  );
}
