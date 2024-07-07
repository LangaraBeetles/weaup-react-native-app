import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    // Ensure we have a valid initial value
    return data.length > 0 ? data[0] : "";
  });

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  useEffect(() => {
    if (selectedValue) {
      onValueChange(selectedValue);
    }
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
    height: 200, // Specify a fixed height
    backgroundColor: theme.colors.white,
  },
});

export default TimePicker;
