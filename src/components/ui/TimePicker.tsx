import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "react-native-wheel-pick";
import { Text } from "./typography";
import { theme } from "@src/styles/theme";

interface TimePickerProps {
  data: string[];
  title: string;
  onValueChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  title,
  data,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(data[0]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  useEffect(() => {
    onValueChange(selectedValue);
  }, []);

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        pickerData={data}
        onValueChange={handleValueChange}
        isShowSelectLine={false}
      />
      <Text
        level="title_3"
        align="center"
        style={{ position: "absolute", right: 30 }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
  },
  picker: {
    width: "100%",
    height: Platform.OS === "android" ? 200 : "100%",
    backgroundColor: theme.colors.white,
  },
});

export default TimePicker;
