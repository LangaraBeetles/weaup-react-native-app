import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Stack from "../ui/Stack";
import Center from "../ui/Center";

const { height, width } = Dimensions.get("screen");

const ContentCard = ({ title, text, section }) => {
  const styleOfCard = section === "training" ? styles.training : styles.content;

  return (
    <Stack style={styleOfCard}>
      <Center justifyContent="center" height="100%">
        <Stack gap={32}>
          <Stack gap={16}>
            {section === "training" ? (
              <Text
                align="center"
                level="badge_title"
                weight="semibold"
                style={{ color: theme.colors.primary[900] }}
              >
                {title}
              </Text>
            ) : section === "setup" ? (
              <Text
                level="title_1"
                style={{ color: theme.colors.primary[900] }}
              >
                {title}
              </Text>
            ) : null}
            {section === "training" ? (
              <Text
                level="caption_4"
                align="center"
                style={{ color: theme.colors.neutral[500] }}
              >
                {text}
              </Text>
            ) :
            section === "setup" ? (<Text
              level="body"
              align="center"
              style={{ color: theme.colors.neutral[500] }}
            >
              {text}
            </Text>)
            : null}
          </Stack>
        </Stack>
      </Center>
    </Stack>
  );
};

const styles = StyleSheet.create({
  content: {
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 4,
  },
  training: {
    opacity: 0.9,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 4,
  },
});

export default ContentCard;
