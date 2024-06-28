import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
} from "react-native";
import { globalStyles } from "@src/styles/globalStyles";

const Button: React.FC<{
  title: string;
  onPress?: () => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  type: { type: "primary" | "secondary"; size?: "s" | "l" };
}> = ({ title, onPress, onLongPress, type }) => {
  const buttonStyleType =
    (type.type === "primary" && styles.buttonPrimary) ||
    (type.type === "secondary" && styles.buttonSecondary);
  const textStyleType =
    (type.type === "primary" && styles.textPrimary) ||
    (type.type === "secondary" && styles.textSecondary);
  const buttonSize =
    (type.size === "s" && styles.smallButton) ||
    (type.size === "l" && styles.largeButton);
  return (
    <TouchableHighlight
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.button, buttonStyleType, buttonSize]}
    >
      <Text style={[styles.text, textStyleType]}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    margin: 10,
  },
  text: {
    fontStyle: "normal",
    lineHeight: 22,
    fontWeight: "600",
    letterSpacing: -0.32,
    textAlign: "center",
  },
  buttonPrimary: {
    backgroundColor: globalStyles.colors.primary[500],
  },
  textPrimary: {
    color: globalStyles.colors.white,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: globalStyles.colors.primary[500],
  },
  textSecondary: {
    color: globalStyles.colors.primary[500],
  },
  smallButton: {
    width: 180,
  },
  largeButton: {
    width: 314,
  },
});

export default Button;
