import { useUser } from "@src/state/useUser";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "../ui/Box";
import Divider from "../ui/Divider";
import StreakDaysIndicator from "../streak/StreakDaysIndicator";
import StreakImageIndicator from "../streak/StreakImageIndicator";

const StreakCard = () => {
  const userStreak = useUser((state) => state.user.dailyStreakCounter);

  return (
    <Box>
      <Stack gap={18}>
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={8} flex={1} alignItems="center">
            <StreakImageIndicator streak={userStreak} />
            <Stack flex={1}>
              <Text level="title_3" weight="bold" style={styles.title}>
                Streak
              </Text>
              <Text level="caption_1" style={styles.title}>
                Complete a Session every day to keep your streak going.
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <StreakDaysIndicator streak={userStreak} />
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.colors.neutral[800],
  },
});

export default StreakCard;
