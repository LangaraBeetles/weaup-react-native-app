import { View, StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";

import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { Text } from "@src/components/ui/typography";
import { createChallenge } from "@src/services/challengeApi";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import CloseButton from "../ui/CloseButton";
import Card from "../analytics/Card";
import challengeIcons from "@src/utils/challenge-icons";
import Icon from "../ui/Icon";
import { theme } from "@src/styles/theme";
import dayjs from "dayjs";
import isChallengeActive from "@src/utils/is-challenge-active";
import PointsCard from "../ui/GoalPicker/PointsCard";

const { icon1: Icon1 } = challengeIcons;

const ChallengeConfirmationForm = () => {
  const { handleSubmit, getValues, setValue } =
    useFormContext<ChallengeInputType>();
  const challenge = getValues();

  const DisplayIcon = challenge?.icon
    ? challengeIcons[challenge.icon] || Icon1
    : Icon1;

  const { diff } = isChallengeActive(challenge.end_at);

  const validate = (data: ChallengeInputType) => {
    createChallenge(data)
      .then((res) => {
        setValue("url", res.data.url); // for android
        setValue("id", res.data._id);
        setValue("step", "result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={42} p={16} alignItems="center">
        <CloseButton
          icon="arrow-left"
          onClose={() => setValue("step", "goal")}
        />
        <Text style={styles.content} level="title_2" align="center">
          All set?
        </Text>
        <Stack w={40} h={40} />
      </Stack>

      <Stack
        flexDirection="column"
        px={30}
        flexGrow={1}
        gap={40}
        alignItems="center"
      >
        <Stack
          px={16}
          py={8}
          w="100%"
          flexGrow={1}
          gap={12}
          alignItems="center"
        >
          <Card
            style={{
              shadowColor: theme.colors.neutral[500],
              shadowOffset: {
                height: 1,
                width: 1,
              },
              shadowRadius: 10,
              shadowOpacity: 0.1,
            }}
          >
            <Stack flexDirection="row" gap={12}>
              <Stack
                backgroundColor={challenge.color}
                h={86}
                w={86}
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

              <Stack justifyContent="center" w="85%" gap={8}>
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
                    {`Spans ${diff} ${diff === 1 ? "day" : "days"}`}
                  </Text>
                </Stack>

                <Stack flexDirection="row" gap={4} alignItems="center">
                  <Icon
                    name="calendar-outline"
                    size={17}
                    color={theme.colors.neutral[400]}
                  />
                  <Text
                    level="caption_1"
                    style={{ color: theme.colors.neutral[400], height: 16 }}
                  >
                    {`From ${dayjs(challenge.start_at).format("MMM DD")} to ${dayjs(challenge.end_at).format("MMM DD")} `}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack pt={16}>
              <PointsCard
                points={
                  Number(challenge?.goal) * Number(challenge?.duration) * 10
                }
              />
            </Stack>
          </Card>
        </Stack>
        <Stack flexGrow={0} justifyContent="flex-end">
          <Button
            variant="primary"
            title="Create Challenge"
            onPress={handleSubmit(validate)}
          />
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 40,
  },
  content: {
    flexGrow: 2,
  },
});

export default ChallengeConfirmationForm;
