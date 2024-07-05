import { globalStyles } from "@src/styles/globalStyles";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

const FloatingButton = (props: any) => (
  <TouchableOpacity onPress={props.onPress} style={styles.floatingButton}>
    <Icon name="plus" color={globalStyles.colors.white} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  floatingButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 49.5,
    height: 49.5,
    bottom: 10,
    right: 20,
    backgroundColor: globalStyles.colors.secondary[600],
    borderRadius: 100,
  },
});

export default FloatingButton;
