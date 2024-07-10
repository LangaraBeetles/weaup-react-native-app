import { theme } from "@src/styles/theme";
import Center from "../ui/Center";
import Stack from "../ui/Stack";
import Icon from "../ui/Icon";
import { Text } from "../ui/typography";
import { useUser } from "@src/state/useUser";
import Divider from "../ui/Divider";

const ScoreComponent = () => {
  const userHP = useUser((state) => state.user.hp);
  const userXP = useUser((state) => state.user.xp);
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const isSessionActive = useUser(
    (state) => state.sessionStatus !== "INACTIVE",
  );

  if (!isSessionActive) {
    return (
      <Center p={15} pb={0}>
        <Stack
          flexDirection="row"
          border={1}
          borderRadius={20}
          px={20}
          py={16}
          w="100%"
          justifyContent="space-between"
          borderColor={theme.colors.neutral[100]}
          backgroundColor={theme.colors.white}
        >
          <Stack
            flexDirection="row"
            gap={2}
            borderColor={theme.colors.neutral[100]}
          >
            <Center pr={10}>
              <Icon
                name="star-fill"
                size={40}
                color={theme.colors.primary[500]}
              />
            </Center>

            <Stack flexDirection="column" justifyContent="space-evenly" gap={4}>
              <Text
                level="caption_1"
                weight="bold"
                style={{ color: theme.colors.neutral[400] }}
              >
                Posture Score
              </Text>
              <Stack flexDirection="row" h={27}>
                <Text level="title_2">{userHP} </Text>
                <Stack justifyContent="flex-end">
                  <Text level="caption_1">/ 100</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Divider variant="vertical" />

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
              alignItems="center"
            >
              <Icon name="lightening" />
              <Stack flexDirection="row" h={16}>
                <Text level="footnote" weight="bold">
                  {userXP}{" "}
                </Text>
                <Text
                  level="footnote"
                  weight="bold"
                  style={{ color: theme.colors.neutral[400] }}
                >
                  XP
                </Text>
              </Stack>
            </Stack>
            <Stack
              flexDirection="row"
              gap={10}
              border={0}
              justifyContent="start"
              alignItems="center"
            >
              <Icon name="streak" />
              <Stack flexDirection="row" h={20}>
                <Text level="footnote" weight="bold">
                  {userStreak}{" "}
                </Text>
                <Text
                  level="footnote"
                  weight="bold"
                  style={{ color: theme.colors.neutral[400] }}
                >
                  day streak
                </Text>
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
          w="100%"
          p={16}
          borderColor={theme.colors.neutral[100]}
          backgroundColor={theme.colors.white}
        >
          <Stack flexDirection="row" justifyContent="space-between">
            <Stack flexDirection="row" alignItems="center">
              <Center pr={8}>
                <Icon
                  name="star-fill"
                  size={24}
                  color={theme.colors.primary[500]}
                />
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
              <Stack pt={19}>
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
