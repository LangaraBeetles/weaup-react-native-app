import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Stack from "../ui/Stack";
import Center from "../ui/Center";

const { height, width } = Dimensions.get("screen");

const ContentCard = ({ title, text }) => {
  return (
    <Stack style={styles.content}>
      <Center justifyContent="center" height="100%" py={height * 0.04} px={20}>
        <Stack gap={32}>
          <Stack gap={16}>
            <Text
              align="center"
              level="title_1"
              style={{ color: theme.colors.primary[900] }}
            >
              {title}
            </Text>
            <Text align="center">{text}</Text>
          </Stack>
        </Stack>
      </Center>
    </Stack>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: height * 0.42,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 20,
    zIndex: 4,
  },
});

export default ContentCard;
