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
import { ActivityIndicator, SafeAreaView, View } from "react-native";

import Icon1 from "assets/challenges/card/icon1.svg";
import Icon2 from "assets/challenges/card/icon2.svg";
import Icon3 from "assets/challenges/card/icon3.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "../ui/Image";
import { router } from "expo-router";
import Main from "../layout/Main";
import Button from "../ui/Button";

const icon = {
  icon1: Icon1,
  icon2: Icon2,
  icon3: Icon3,
};

const JoinChallengeContainer = (props: {
  challengeId: string;
  userId: string;
}) => {
  const { isLoading: joining, error: joinError } = useQuery({
    queryKey: ["join-challenge", props.userId, props.challengeId],
    queryFn: () => joinChallenge(props.challengeId),
    enabled: !!props.userId && !!props.challengeId,
  });

  const {
    data,
    isLoading: challengeLoading,
    error: challengeError,
  } = useQuery({
    queryKey: ["get-challenge", props.userId, props.challengeId],
    queryFn: () => getChallengeById(props.challengeId),
    enabled: !!props.userId && !!props.challengeId,
  });

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["get-user", props.userId, props.challengeId],
    queryFn: () => getUserById(props.userId),
    enabled: !!props.userId && !!props.challengeId,
  });

  const startAt = dayjs(data?.start_at);
  const endAt = dayjs(data?.end_at);

  const name = data?.name;
  const dateRangeReadable = `${
    dayjs().isSame(startAt, "day")
      ? "Started Today"
      : dayjs().isBefore(startAt, "day")
        ? "Starts on " + startAt.format("MMM DD")
        : "Started on " + startAt.format("MMM DD")
  }`;
  const remainingTime = `Ends in ${endAt.diff(dayjs(), "days")} days`;
  const goalPoints =
    safenumber(data?.goal) *
    safenumber(data?.duration) *
    safenumber(data?.members?.length, 1);
  const progress = data?.members.reduce(
    (accu: any, curr: any) => accu + curr.points,
    0,
  );
  const percentage = Math.ceil(safenumber(progress / goalPoints) * 100);
  const DisplayIcon = data?.icon ? icon[data?.icon] || Icon1 : Icon1;

  const closeModal = () => {
    router.push("/together");
  };

  const error = joinError || userError || challengeError;

  if (joining || userLoading || challengeLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!!error) {
    return (
      <SafeAreaView>
        <Main style={{ justifyContent: "space-between" }}>
          <Stack flex={1} justifyContent="center" alignItems="center" gap={8}>
            <Icon name="face-sad" />
            <Text>Challenge no longer available to join</Text>
          </Stack>
          <Stack flex={0}>
            <Button title="Go back to challenges" onPress={closeModal} />
          </Stack>
        </Main>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Main style={{ justifyContent: "space-between" }}>
        <Stack>
          <Stack pt={40}>
            <View>
              <Stack px={16} alignItems="center" gap={8} pb={24}>
                <Image name="tada" width={32} height={32} />
                <Text level="title_2" align="center">
                  Congrats, you joined {data?.name}!
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
                      backgroundColor: data?.color ?? theme.colors.text,
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
                      <Stack
                        flexDirection="row"
                        gap={4}
                        alignItems="center"
                        h={15}
                      >
                        <Icon
                          name="calendar-outline"
                          color={theme.colors.neutral[400]}
                        />
                        <Text level="caption_1">{dateRangeReadable}</Text>
                      </Stack>
                      <Stack
                        flexDirection="row"
                        gap={4}
                        alignItems="center"
                        h={15}
                      >
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

                {data?.description && (
                  <Stack gap={8}>
                    <Text level="footnote">Description</Text>
                    <Text level="body">{data?.description}</Text>
                  </Stack>
                )}

                <ProgressBar
                  currentValue={progress || goalPoints * 0.02}
                  goal={goalPoints}
                  backgroundColor={theme.colors.neutral[100]}
                  barColor={data?.color ?? theme.colors.text}
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
                  <Divider
                    variant="vertical"
                    color={theme.colors.neutral[200]}
                  />
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
                      content={user?.data?.name ? user?.data?.name[0] : "G"}
                      variant={user?.data?.avatar_bg}
                    />
                    <Text level="body">{user?.data?.name}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </View>
          </Stack>
        </Stack>
        <Stack>
          <Button title="Go back to challenges" onPress={closeModal} />
        </Stack>
      </Main>
    </SafeAreaView>
  );
};

export default JoinChallengeContainer;
