import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface NewLevelModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewLevelModal: React.FC<NewLevelModalProps> = ({
  isVisible,
  onClose,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>You have reached Level 3</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelLabel}>Level 2</Text>
          <Text style={styles.levelLabel}>Level 3</Text>
        </View>
        <View style={styles.levelBarContainer}>
          <View style={styles.levelBar} />
        </View>
        <Image
          source={require("../../../assets/icon.png")} // Update this path if necessary
          style={styles.image}
        />
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Fire Weasel</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 70,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  levelLabel: {
    fontWeight: "bold",
  },
  levelBarContainer: {
    position: "absolute",
    top: 110,
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  levelBar: {
    width: "100%",
    height: "100%",
    backgroundColor: "gray",
  },
  badgeContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewLevelModal;
