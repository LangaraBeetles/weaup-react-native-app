import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { Pressable, StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "../ui/Box";
import Divider from "../ui/Divider";
import { useRouter } from "expo-router";

const DailyGoalCard = () => {
  const router = useRouter();
  const userDailyGoal = useUser((state) => state.user.dailyGoal);

  const changeGoal = () => {
    router.navigate("/setup/set-up-goal3");
  };

  return (
    <Box>
      <Stack gap={18}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="row" gap={8} alignItems="center">
            <Icon name="colorLabelIcon-target" />
            <Text level="subhead" weight="bold" style={styles.title}>
              Daily Goal
            </Text>
          </Stack>
          <>
            <Text level="headline">{userDailyGoal}</Text>
          </>
        </Stack>

        <Divider />
        <Pressable onPress={changeGoal}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text level="footnote">Change daily goal</Text>
            <Icon name="chevron-right" />
          </Stack>
        </Pressable>
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.colors.neutral[800],
  },
});

export default DailyGoalCard;
