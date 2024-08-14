import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "../ui/Box";

const PostureScoreCard = () => {
  const userPostureScore = useUser((state) => state.user.hp);

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap={8} alignItems="center">
          <Icon name="colorLabelIcon-star" />
          <Text level="subhead" weight="bold" style={styles.title}>
            Posture Score
          </Text>
        </Stack>
        <Stack flexDirection="row" gap={8} alignItems="center">
          <Text level="title_1" weight="bold" style={styles.title}>
            {userPostureScore}
          </Text>
          <Text level="caption_1" weight="bold" style={styles.caption1}>
            / 100
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.colors.neutral[800],
  },
  caption1: {
    color: globalStyles.colors.neutral[400],
  },
});

export default PostureScoreCard;
