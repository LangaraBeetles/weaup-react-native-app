import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const FloatingButton = (props: any) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={styles.floatingButton}
  ></TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    width: 49.5,
    height: 49.5,
    bottom: 10,
    right: 20,
    borderRadius: 100,
    backgroundColor: "#000",
  },
});

export default FloatingButton;
