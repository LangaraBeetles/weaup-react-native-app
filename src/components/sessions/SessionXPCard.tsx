import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { Dimensions, StyleSheet } from "react-native";
import Box from "../ui/Box";
import ProgressBar from "../ui/ProgressBar";
import levels from "@src/levels";
import Image from "../ui/Image";
import { theme } from "@src/styles/theme";

const { width } = Dimensions.get("window");

const XPCard = () => {
  const userXP = useUser((state) => state.user.xp);
  const userLevel = useUser((state) => state.user.level);

  const nextLevelXP = () => {
    for (const level of levels) {
      if (userXP < level.xp) {
        return level.xp;
      }
    }
    return userXP;
  };

  return (
    <Box>
      <Stack flexDirection="row" gap={4}>
        <Stack w={width * 0.6}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" gap={8} alignItems="center">
              <Icon name="colorLabelIcon-xp" size={16} />
              <Text level="footnote" style={{ lineHeight: 19 }}>
                You gained{" "}
                <Text level="footnote" weight="bold">
                  {userXP} XP {/*TODO: Calculate the xp per session */}
                </Text>{" "}
                in this session
              </Text>
            </Stack>
          </Stack>

          <ProgressBar
            currentValue={userXP}
            goal={nextLevelXP()}
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
        <Image
          name="level-up-image"
          width={64}
          style={{ marginHorizontal: 13, opacity: 0.55 }}
        />
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.neutral[800],
  },
  caption1: {
    color: theme.colors.neutral[400],
  },
});

export default XPCard;
