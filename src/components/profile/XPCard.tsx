import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";
import levels from "@src/levels";
import { theme } from "@src/styles/theme";

const XPCard = () => {
  const userXP = useUser((state) => state.user.xp);
  const userLevel = useUser((state) => state.user.level);

  const nextLevelXP = () => {
    for (const level of levels) {
      if (userXP < level.xp) {
        return level.xp;
      }
    }
    return null;
  };

  return (
    <Box>
      <Stack>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={8} alignItems="center">
            <Icon name="colorLabelIcon-xp" />
            <Text level="subhead" weight="bold" style={styles.title}>
              XP
            </Text>
          </Stack>
          <Text level="headline">{userXP}</Text>
        </Stack>

        <ProgressBar
          currentValue={userXP}
          goal={nextLevelXP() ?? userXP}
          height={16}
          backgroundColor={theme.colors.white}
          barColor={theme.colors.error[400]}
          borderWidth={1}
        />

        <Stack flexDirection="row" justifyContent="space-between">
          <Text level="caption_1" style={styles.caption1}>
            Level {userLevel}
          </Text>
          <Text level="caption_1" style={styles.caption1}>
            Level {Number(userLevel) + 1}
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

export default XPCard;
