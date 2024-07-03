import { theme } from "@src/styles/theme";
import Center from "../ui/Center";
import Stack from "../ui/Stack";
import Icon from "../ui/Icon";
import { Text } from "../ui/typography";
import { useUser } from "@src/state/useUser";

const ScoreComponent = () => {
  const userHP = useUser((state) => state.user.hp);
  const userXP = useUser((state) => state.user.xp);
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  //   const isSessionActive = useUser((state) => state.isSessionActive);
  const isSessionActive = true;

  if (!isSessionActive) {
    return (
      <Center p={15} pb={0}>
        <Stack
          flexDirection="row"
          border={1}
          borderRadius={20}
          gap={10}
          w={"100%"}
          px={16}
          py={25}
          justifyContent="space-between"
          borderColor={theme.colors.neutral[100]}
          backgroundColor={theme.colors.white}
        >
          <Stack
            flexDirection="row"
            gap={2}
            borderRight={1}
            borderColor={"#E7E5E4"}
            pr={20}
          >
            <Center pr={10}>
              <Icon name="star" size={40} />
            </Center>

            <Stack flexDirection="column" justifyContent="space-evenly" gap={7}>
              <Text level="caption_1">Posture Score</Text>
              <Stack flexDirection="row">
                <Text level="title_2">{userHP} </Text>
                <Stack pt={9}>
                  <Text level="caption_1">/ 100</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            flexDirection="column"
            border={0}
            justifyContent="space-evenly"
          >
            <Stack
              flexDirection="row"
              gap={10}
              border={0}
              justifyContent="start"
            >
              <Icon name="lightening" />
              <Stack flexDirection="row">
                <Text level="footnote" weight="bold">
                  {userXP}{" "}
                </Text>
                <Text level="footnote">XP</Text>
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              gap={10}
              border={0}
              justifyContent="start"
            >
              <Icon name="streak" />
              <Stack flexDirection="row">
                <Text level="footnote" weight="bold">
                  {userStreak}{" "}
                </Text>
                <Text level="footnote">Day Streak</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    );
  } else {
    return (
      <Center p={15} pb={0}>
        <Stack
          border={1}
          borderRadius={20}
          w={"100%"}
          p={16}
          borderColor={theme.colors.neutral[100]}
          backgroundColor={theme.colors.white}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" alignItems="center">
              <Center pr={8}>
                <Icon name="star" size={24} />
              </Center>
              <Text
                level="subhead"
                weight="semibold"
                style={{ lineHeight: 22 }}
              >
                Posture Score
              </Text>
            </Stack>

            <Stack flexDirection="row">
              <Text level="title_1">{userHP} </Text>
              <Stack pt={9}>
                <Text level="caption_1">/ 100</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    );
  }
};

export default ScoreComponent;
