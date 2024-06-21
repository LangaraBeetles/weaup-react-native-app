import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

const FloatingButton = (props: any) => (
  <TouchableOpacity onPress={props.onPress} style={styles.floatingButton}>
    <Image source={require("../../../assets/img/addIcon.png")} />
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
  },
});

export default FloatingButton;
