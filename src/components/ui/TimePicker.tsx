import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "react-native-wheel-pick";

interface TimePickerProps {
  data: string[];
  onValueChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ data, onValueChange }) => {
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
        textSize={30}
        selectTextColor="#000"
        selectBackgroundColor={"#FFFFFF0A"}
        isShowSelectLine={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  picker: {
    width: 100,
    height: 215,
    backgroundColor: "white",
  },
});

export default TimePicker;
