import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@src/components/ui/typography";
import ProgressBar from "@src/components/ui/ProgressBar";
import safenumber from "@src/utils/safenumber";
import { globalStyles } from "@src/styles/globalStyles";
import Stack from "@src/components/ui/Stack";
import Icon from "@src/components/ui/Icon";
import { theme } from "@src/styles/theme";

const ChallengeCard = (props: any) => {
  const router = useRouter();
  const { challenge } = props;
  const end = new Date(challenge.end_at);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();
  const diff = endDay - new Date().getDate();

  const isOngoing = diff >= 0;

  const showDetails = () => {
    router.push({
      pathname: "challengeDetailsScreen",
      params: { id: challenge._id, isOngoing: `${isOngoing}` },
    });
  };

  const goalPoints =
    safenumber(challenge.goal, 0) *
    safenumber(challenge.duration, 0) *
    safenumber(challenge.members.length, 1);

  const progress = challenge.members.reduce(
    (accu: any, curr: any) => accu + safenumber(curr.points),
    0,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDetails}>
        <Stack flexDirection="row" gap={12}>
          <View
            style={{
              width: 56,
              height: 56,
              backgroundColor: "pink",
              borderRadius: 8,
            }}
          />
          {/* TODO: replace with image */}

          <Stack justifyContent="center">
            <Text level="title_3">{challenge.name}</Text>
            <Stack flexDirection="row" gap={4} alignItems="center">
              <Icon
                name="clock-outline"
                size={17}
                color={theme.colors.neutral[400]}
              />
              <Text
                level="caption_1"
                style={{ color: theme.colors.neutral[400], height: 16 }}
              >
                {diff === 0
                  ? "Ends today"
                  : diff > 0
                    ? `${diff} days left`
                    : `Ended on ${endMonth} ${endDay} `}
              </Text>
            </Stack>
          </Stack>
        </Stack>

        <ProgressBar
          currentValue={progress}
          goal={challenge.goal}
          backgroundColor={globalStyles.colors.neutral[100]}
        />
        <Text>
          {progress}/{goalPoints}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
});

export default ChallengeCard;
