import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import Modal from "react-native-modal";
import { theme } from "@src/styles/theme";
import Stack from "../ui/Stack";
import Image, { ImageConfig, ImageName } from "../ui/Image";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";

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
  const getImageNameForLevel = (level: number): ImageName => {
    const imageName = `level-${level}-up` as ImageName;
    if (imageName in ImageConfig) {
      return imageName;
    }
    return "level-1-up"; // Fallback
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => {
        onClose(level);
      }}
    >
      <Box>
        <Stack alignItems="center" gap={16} px={12} py={6}>
          <View style={styles.icon}>
            <Image name="tada" />
          </View>

          <Stack flexDirection="row" gap={4}>
            <Text level="title_3">You have reached</Text>
            <Text style={styles.levelTitle} level="title_3">
              Level {level}
            </Text>
          </Stack>

          <Stack w={"100%"}>
            <ProgressBar
              currentValue={100}
              goal={100}
              height={16}
              backgroundColor={theme.colors.white}
              barColor={theme.colors.error[400]}
              borderWidth={1}
              icon={true}
            />

            <Stack flexDirection="row" justifyContent="space-between">
              <Text level="caption_1" style={styles.caption1}>
                Level {level - 1}
              </Text>
              <Text level="caption_1" style={styles.caption1}>
                Level {level}
              </Text>
            </Stack>
          </Stack>

          <View style={styles.badgeContainer}>
            <Image name={getImageNameForLevel(level)} />
          </View>
        </Stack>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  levelTitle: { color: theme.colors.secondary[600] },

  badgeContainer: {
    marginVertical: 10,
    alignItems: "center",
    width: 180,
    height: 150,
  },
  icon: {
    width: 32,
    height: 32,
  },
  caption1: {
    color: theme.colors.neutral[400],
  },
});

export default NewLevelModal;
