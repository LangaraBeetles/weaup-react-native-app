import { StyleSheet } from "react-native";

import dayjs from "dayjs";
import safenumber from "@src/utils/safenumber";
import { Text } from "@src/components/ui/typography";
import ProgressBar from "@src/components/ui/ProgressBar";
import Stack from "@src/components/ui/Stack";
import Icon from "@src/components/ui/Icon";
import Center from "@src/components/ui/Center";
import { theme } from "@src/styles/theme";
import Divider from "@src/components/ui/Divider";
import challengeIcons from "@src/utils/challenge-icons";
import { ChallengeIconType } from "@src/interfaces/challenge.types";

const { icon1: Icon1 } = challengeIcons;

const ChallengeDetailCard = (props: any) => {
  const { data, isOngoing, color } = props;
  const startAt = dayjs(data?.start_at);
  const endAt = dayjs(data?.end_at);

  const name = data?.name;
  const dateRangeReadable = `From ${startAt.format("MMM DD")} to ${endAt.format("MMM DD")}`;
  const remainingTime = isOngoing
    ? `Ends in ${endAt.diff(dayjs(), "days")} days`
    : `Ended on ${endAt.format("MMM DD")}`;

  const icon = data?.data?.icon as ChallengeIconType;

  const DisplayIcon = icon ? challengeIcons[icon] || Icon1 : Icon1;

  const goalPoints =
    safenumber(data?.goal) *
    safenumber(data?.duration) *
    safenumber(data?.members.length, 1);

  const progress = data?.members.reduce(
    (accu: any, curr: any) => accu + curr.points,
    0,
  );

  const percentage = safenumber(progress / goalPoints) * 100;

  return (
    <Stack justifyContent="center" gap={12}>
      {/* image and challenge details */}
      <Stack flexDirection="row" gap={12}>
        <Stack
          backgroundColor={data?.color}
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

        <Stack gap={4} flex={4}>
          <Text level="title_3">{name}</Text>
          {isOngoing && (
            <Text level="caption_1" style={styles.captionDates}>
              {dateRangeReadable}
            </Text>
          )}
          <Text level="caption_1" style={styles.captionDates}>
            {remainingTime}
          </Text>
        </Stack>
      </Stack>

      {/* progress bar */}
      <ProgressBar
        currentValue={progress}
        goal={goalPoints}
        backgroundColor={theme.colors.neutral[100]}
        barColor={color}
      />

      {/* scores */}
      <Stack flexDirection="row" gap={10} justifyContent="space-around">
        <Stack flexDirection="column" alignItems="left">
          <Text level="title_3">{progress}</Text>
          <Text level="caption_1" style={styles.captionScores}>
            Current points
          </Text>
        </Stack>
        <Divider variant="vertical" />
        <Stack flexDirection="column" alignItems="left">
          <Text level="title_3">{goalPoints}</Text>
          <Text level="caption_1" style={styles.captionScores}>
            Points to go
          </Text>
        </Stack>
        <Divider variant="vertical" />

        <Stack flexDirection="column" alignItems="left">
          <Text level="title_3">{Math.ceil(percentage)}%</Text>
          <Text level="caption_1" style={styles.captionScores}>
            Completed
          </Text>
        </Stack>
      </Stack>

      <Center
        backgroundColor={theme.colors.secondary[100]}
        borderRadius={24}
        py={8}
        px={20}
      >
        {isOngoing ? (
          <Stack flexDirection="row" gap={8}>
            <Icon name="sparkle" color={theme.colors.secondary[700]} />
            <Text level="footnote_2" style={styles.footnote} align="center">
              You achieved {progress} points so far!
            </Text>
          </Stack>
        ) : (
          <Stack flexDirection="row" gap={8}>
            {percentage === 100 ? (
              <Icon name="award-outline" color={theme.colors.secondary[700]} />
            ) : null}

            <Text level="footnote_2" style={styles.footnote} align="center">
              {percentage === 100 ? "Completed" : "Nice try!"}
            </Text>
          </Stack>
        )}
      </Center>
    </Stack>
  );
};

const styles = StyleSheet.create({
  captionDates: {
    color: theme.colors.neutral[400],
  },
  captionScores: {
    color: theme.colors.neutral[800],
  },
  footnote: {
    color: theme.colors.secondary[700],
  },
});

export default ChallengeDetailCard;
