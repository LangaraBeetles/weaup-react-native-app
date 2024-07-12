import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { getChallengeById, joinChallenge } from "@src/services/challengeApi";
import { Text } from "@src/components/ui/typography";
import Icon from "@src/components/ui/Icon";
import safenumber from "@src/utils/safenumber";
import Stack from "@src/components/ui/Stack";
import Center from "@src/components/ui/Center";
import { theme } from "@src/styles/theme";
import Divider from "@src/components/ui/Divider";
import ProgressBar from "@src/components/ui/ProgressBar";
import formatNumber from "@src/utils/format-number";
import Avatar from "@src/components/ui/Avatar";

import { getUserById } from "@src/services/userApi";
import { ChallengeResponseType } from "@src/interfaces/challenge.types";
import { View } from "react-native";

import Icon1 from "assets/challenges/card/icon1.svg";
import Icon2 from "assets/challenges/card/icon2.svg";
import Icon3 from "assets/challenges/card/icon3.svg";
import { AuthUserResponse } from "../hooks/useAuth";

const icon = {
  icon1: Icon1,
  icon2: Icon2,
  icon3: Icon3,
};

const JoinChallengeContainer = (props: {
  challengeId: string;
  userId: string;
}) => {
  const [challengeData, setChallengeData] = useState<ChallengeResponseType>();
  const [userData, setUserData] = useState<Omit<AuthUserResponse, "token">>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    joinChallenge(props.challengeId)
      .then(() => {
        getChallengeById(props.challengeId).then((res) => {
          setChallengeData(res.data);
        });
        getUserById(props.userId).then((res) => {
          setUserData(res.data);
        });
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }, []);

  const startAt = dayjs(challengeData?.start_at);
  const endAt = dayjs(challengeData?.end_at);
  const name = challengeData?.name;
  const dateRangeReadable = `${
    dayjs().isSame(startAt, "day")
      ? "Started Today"
      : dayjs().isBefore(startAt, "day")
        ? "Starts on " + startAt.format("MMM DD")
        : "Started on " + startAt.format("MMM DD")
  }`;
  const remainingTime = `Ends in ${endAt.diff(dayjs(), "days")} days`;
  const goalPoints =
    safenumber(challengeData?.goal) *
    safenumber(challengeData?.duration) *
    safenumber(challengeData?.members.length, 1);
  const progress = challengeData?.members.reduce(
    (accu: any, curr: any) => accu + curr.points,
    0,
  );
  const percentage = Math.ceil(safenumber(progress / goalPoints) * 100);
  const DisplayIcon = challengeData?.icon
    ? icon[challengeData?.icon] || Icon1
    : Icon1;

  return (
    <View>
      {error ? (
        <Center>
          <Text>{error}</Text>
        </Center>
      ) : (
        <View>
          <Stack px={16} alignItems="center" gap={8} pb={24}>
            {/* TODO:replace with correct icon */}
            <Icon name="face-happy" />
            <Text level="title_2" align="center">
              Congrats, you joined {challengeData?.name}!
            </Text>
            <Center px={40}>
              <Text level="footnote" align="center">
                Challenge your friends and start levelling up your posture!
              </Text>
            </Center>
          </Stack>
          <Stack
            borderRadius={20}
            borderColor={theme.colors.neutral[100]}
            border={1}
            backgroundColor={theme.colors.white}
            p={16}
            gap={20}
          >
            <Stack flexDirection="row">
              {/* image */}
              <Center
                style={{
                  backgroundColor: challengeData?.color ?? theme.colors.text,
                  flex: 1,
                  borderRadius: 8,
                  justifyContent: "flex-end",
                }}
              >
                <DisplayIcon width={46} height={46} />
              </Center>

              {/* details */}
              <Stack gap={8} flex={4} px={12}>
                <Text level="title_3">{name}</Text>
                <Stack
                  flexDirection="row"
                  gap={20}
                  justifyContent="space-between"
                >
                  <Stack flexDirection="row" gap={4} alignItems="center">
                    <Icon
                      name="calendar-outline"
                      color={theme.colors.neutral[400]}
                    />
                    <Text level="caption_1">{dateRangeReadable}</Text>
                  </Stack>
                  <Stack flexDirection="row" gap={4} alignItems="center">
                    <Icon
                      name="clock-outline"
                      color={theme.colors.neutral[400]}
                    />
                    <Text level="caption_1">{remainingTime}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Divider variant="horizontal" />

            <Stack gap={8}>
              <Text level="footnote">Description</Text>
              <Text level="body">{challengeData?.description}</Text>
            </Stack>

            <ProgressBar
              currentValue={progress}
              goal={goalPoints}
              backgroundColor={theme.colors.neutral[100]}
              barColor={challengeData?.color ?? theme.colors.text}
            />

            <Stack
              flexDirection="row"
              backgroundColor={theme.colors.neutral[50]}
              justifyContent="space-around"
              py={12}
              px={20}
              borderRadius={12}
            >
              <Stack gap={4}>
                <Text level="title_3">{formatNumber(goalPoints)}</Text>
                <Text level="caption_1">Points to go</Text>
              </Stack>
              <Divider variant="vertical" color={theme.colors.neutral[200]} />
              <Stack gap={4}>
                <Text level="title_3">{percentage}%</Text>
                <Text level="caption_1">Completed</Text>
              </Stack>
            </Stack>

            <Divider variant="horizontal" />

            <Stack gap={8}>
              <Text level="footnote">Invited by</Text>
              <Stack flexDirection="row" gap={8} alignItems="center">
                <Avatar
                  variant={userData?.avatar_bg}
                  content={userData?.name ? userData?.name[0] : ""}
                />
                <Text level="body">{userData?.name}</Text>
              </Stack>
            </Stack>
          </Stack>
        </View>
      )}
    </View>
  );
};

export default JoinChallengeContainer;
