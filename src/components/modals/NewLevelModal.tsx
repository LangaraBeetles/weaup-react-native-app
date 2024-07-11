import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import Modal from "react-native-modal";
import { theme } from "@src/styles/theme";

interface NewLevelModalProps {
  isVisible: boolean;
  onClose: (level: number) => void;
  level: number;
}

const NewLevelModal: React.FC<NewLevelModalProps> = ({
  level,
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        onClose(level);
      }}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title} level="title_3">
          You have reached Level {level}
        </Text>
        <View style={styles.levelContainer}>
          <View style={styles.levelBarContainer} />
          <Text level="caption_2">Level {level - 1}</Text>
          <Text level="caption_2">Level {level}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Image
            source={require("../../../assets/icon.png")} // Update this path if necessary
            style={styles.image}
          />
          <Text level="title_3">Fire Weasel</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.colors.white,
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    marginBottom: 70,
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    marginBottom: 40,
  },
  levelBarContainer: {
    position: "absolute",
    top: -20,
    width: "100%",
    height: 10,
    backgroundColor: theme.colors.secondary[600],
    borderRadius: 5,
    overflow: "hidden",
  },
  badgeContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
});

export default NewLevelModal;
