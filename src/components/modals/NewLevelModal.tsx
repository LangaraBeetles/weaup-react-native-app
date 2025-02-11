import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Text } from "@src/components/ui/typography";
import { Modal } from "react-native";
import { theme } from "@src/styles/theme";
import Stack from "../ui/Stack";
import Image, { ImageConfig, ImageName } from "../ui/Image";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";
import Shimmer from "../ui/Shimmer";
import Center from "../ui/Center";

const { width } = Dimensions.get("window");

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
  const [showShimmer, setShowShimmer] = useState(false);

  const getImageNameForLevel = (level: number): ImageName => {
    const imageName = `level-${level}-up` as ImageName;
    if (imageName in ImageConfig) {
      return imageName;
    }
    return "level-1-up"; // Fallback
  };

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      presentationStyle="overFullScreen"
      transparent={true}
      onRequestClose={() => {
        onClose(level);
      }}
    >
      <TouchableWithoutFeedback onPress={() => onClose(level)}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <Box>
              <Stack
                alignItems="center"
                gap={16}
                px={12}
                py={6}
                w={width * 0.85}
              >
                <View style={styles.icon}>
                  <Image name="tada" />
                </View>

                <Stack flexDirection="row" gap={4}>
                  <Text level="title_2">You have reached</Text>
                  <Text style={styles.levelTitle} level="title_2">
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
                    onAnimationEnd={() => setShowShimmer(true)}
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
              </Stack>

              <Center>
                <Shimmer
                  show={showShimmer}
                  width={180}
                  height={150}
                  duration={3500}
                  onAnimationEnd={() => setShowShimmer(false)}
                >
                  <View style={styles.badgeContainer}>
                    <Image name={getImageNameForLevel(level)} />
                  </View>
                </Shimmer>
              </Center>
            </Box>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
