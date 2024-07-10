import { theme } from "@src/styles/theme";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type DimensionValue = number | `${number}%`;

interface InputProps extends TextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: ViewStyle | TextStyle;
  w?: DimensionValue;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  style,
  w = "100%",
  ...props
}) => {
  return (
    <TextInput
      style={[styles.input, style, { width: w }]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: theme.colors.neutral[400],
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});

export default Input;
