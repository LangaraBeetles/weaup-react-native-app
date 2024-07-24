import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@src/components/ui/typography";
import ProgressBar from "@src/components/ui/ProgressBar";
import safenumber from "@src/utils/safenumber";
import Stack from "@src/components/ui/Stack";
import Icon from "@src/components/ui/Icon";
import { theme } from "@src/styles/theme";
import { ChallengeResponseType } from "@src/interfaces/challenge.types";
import formatNumber from "@src/utils/format-number";
import Avatar from "@src/components/ui/Avatar";
import isChallengeActive from "@src/utils/is-challenge-active";
import challengeIcons from "@src/utils/challenge-icons";

const { icon1: Icon1 } = challengeIcons;

const ChallengeCard = (props: { challenge: ChallengeResponseType }) => {
  const router = useRouter();
  const { challenge } = props;
  const end = new Date(challenge.end_at);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();

  const DisplayIcon = challenge?.icon
    ? challengeIcons[challenge.icon] || Icon1
    : Icon1;

  const { diff } = isChallengeActive(challenge.end_at);

  const showDetails = () => {
    router.push({
      pathname: "/challenges/challenge-details",
      params: { id: challenge._id },
    });
  };

  const goalPoints =
    safenumber(challenge.goal, 0) * safenumber(challenge.duration, 0) * 10;

  const progress = challenge.members.reduce(
    (accu: any, curr: any) => accu + safenumber(curr.points),
    0,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDetails}>
        <Stack flexDirection="row" gap={12}>
          <Stack
            backgroundColor={challenge.color}
            w={56}
            h={56}
            borderRadius={8}
            justifyContent="center"
            alignItems="center"
          >
            <DisplayIcon
              height="100%"
              width="100%"
              style={{
                aspectRatio: 0.8,
              }}
            />
          </Stack>
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
          goal={goalPoints ?? 0}
          barColor={challenge.color}
          backgroundColor={theme.colors.neutral[100]}
        />
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row">
            {challenge.members.slice(0, 3).map((member, index) => {
              return (
                <Avatar
                  content={member?.user?.name?.[0] ?? `G${index + 1}`}
                  borderWidth={3}
                  borderColor={theme.colors.white}
                  variant={member?.user?.avatar_bg}
                  fontSize={10}
                  style={{
                    right: index > 0 ? index * 10 : 0,
                    height: 28,
                    width: 28,
                  }}
                  showDefault={false}
                />
              );
            })}
            {challenge.members.length > 3 ? (
              <Avatar
                content={`+${challenge.members.length - 3}`}
                borderWidth={3}
                borderColor={theme.colors.white}
                variant="gray1"
                fontSize={10}
                style={{
                  right: challenge.members.length + 22,
                  height: 28,
                  width: 28,
                }}
                showDefault={false}
              />
            ) : null}
          </Stack>
          <Text level="footnote" style={{ color: theme.colors.neutral[500] }}>
            {formatNumber(progress)}/{formatNumber(goalPoints)}
          </Text>
        </Stack>
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
