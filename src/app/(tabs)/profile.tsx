import React from "react";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Center from "@src/components/ui/Center";
import Button from "@src/components/ui/Button";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";
import useAuth from "@src/components/hooks/useAuth";
import Icon from "@src/components/ui/Icon";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "@src/components/ui/Box";
import Spacer from "@src/components/ui/Spacer";
import ProgressBar from "@src/components/ui/ProgressBar";
import levels from "@src/levels";
import ProfileBadgeContainerPreview from "@src/components/container/ProfileBadgeContainerPreview";

const ProfileScreen = () => {
  const isGuest = useUser((data) => data.isGuest);
  const userName = useUser((state) => state.user.name);
  const userEmail = useUser((state) => state.user.email);
  const userPostureScore = useUser((state) => state.user.hp);
  const userXP = useUser((state) => state.user.xp);
  const userLevel = useUser((state) => state.user.level);
  const userDailyGoal = useUser((state) => state.user.dailyGoal);
  const router = useRouter();
  const { logout } = useAuth();

  const nextLevelXP = () => {
    for (const level of levels) {
      if (userXP < level.xp) {
        return level.xp;
      }
    }
    return null;
  };

  const handleLogout = async () => {
    logout();
    router.replace("/");
  };

  if (isGuest) {
    return <GoogleSignUp />;
  }

  return (
    <>
      <ScrollView style={styles.constainer}>
        <Spacer height={64} />
        <Stack gap={20}>
          {/* Element 1 */}
          <Stack flexDirection="row" gap={12}>
            <Icon name="profile-avatar" />
            <Stack flexDirection="row" justifyContent="space-between" flex={1}>
              <Center>
                <Stack>
                  <Text level="title_3" style={styles.title}>
                    {userName}
                  </Text>
                  <Text level="subhead" style={styles.subhead1}>
                    {userEmail}
                  </Text>
                </Stack>
              </Center>
              <Center>
                <Icon name="chevron-right" />
              </Center>
            </Stack>
          </Stack>

          {/* Element 2 */}
          <Box>
            <Stack flexDirection="row" justifyContent="space-between">
              <Stack flexDirection="row" gap={8}>
                <Center>
                  <Icon name="colorLabelIcon-star" />
                </Center>

                <Center>
                  <Text level="subhead" weight="bold" style={styles.title}>
                    Posture Score
                  </Text>
                </Center>
              </Stack>
              <Stack flexDirection="row" gap={8}>
                <Center>
                  <Text level="title_1" weight="bold" style={styles.title}>
                    {userPostureScore}
                  </Text>
                </Center>
                <Center>
                  <Text level="caption_1" weight="bold" style={styles.caption1}>
                    / 100
                  </Text>
                </Center>
              </Stack>
            </Stack>
          </Box>

          {/* Element 3 */}
          <Box>
            <Stack>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack flexDirection="row" gap={8}>
                  <Icon name="colorLabelIcon-xp" />
                  <Center>
                    <Text level="subhead" weight="bold" style={styles.title}>
                      XP
                    </Text>
                  </Center>
                </Stack>
                <Center>
                  <Text level="headline">{userXP}</Text>
                </Center>
              </Stack>

              <ProgressBar
                currentValue={userXP}
                goal={nextLevelXP()}
                height={16}
                barColor={globalStyles.colors.error[400]}
                backgroundColor={globalStyles.colors.neutral[100]}
              />

              <Stack flexDirection="row" justifyContent="space-between">
                <Text level="caption_1" style={styles.caption1}>
                  Level {userLevel}
                </Text>
                <Text level="caption_1" style={styles.caption1}>
                  Level {userLevel + 1}
                </Text>
              </Stack>
            </Stack>
          </Box>

          {/* Element 4 */}
          <Box>
            <Stack gap={18}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack flexDirection="row" gap={8}>
                  <Center>
                    <Icon name="colorLabelIcon-award" />
                  </Center>
                  <Center>
                    <Text level="subhead" weight="bold" style={styles.title}>
                      Badges
                    </Text>
                  </Center>
                </Stack>
                <Center>
                  {/* TODO: get user badges count */}
                  <Text level="headline">{userXP}</Text>
                </Center>
              </Stack>
              <ProfileBadgeContainerPreview />
              {/* TODO: add divider */}
              <Stack flexDirection="row" justifyContent="space-between">
                <Center>
                  <Text level="footnote">View all</Text>
                </Center>
                <Icon name="chevron-right" />
              </Stack>
            </Stack>
          </Box>

          {/* Element 5 */}
          <Box>
            <Stack gap={18}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack flexDirection="row" gap={8}>
                  <Center>
                    <Icon name="colorLabelIcon-target" />
                  </Center>
                  <Center>
                    <Text level="subhead" weight="bold" style={styles.title}>
                      Daily Goal
                    </Text>
                  </Center>
                </Stack>
                <Center>
                  {/* TODO: get user badges count */}
                  <Text level="headline">{userDailyGoal}</Text>
                </Center>
              </Stack>

              {/* TODO: add divider */}
              <Stack flexDirection="row" justifyContent="space-between">
                <Center>
                  <Text level="footnote">Change daily goal</Text>
                </Center>
                <Icon name="chevron-right" />
              </Stack>
            </Stack>
          </Box>

          {/* Element 6 */}
          <Box>
            <Stack gap={18}>
              <Stack flexDirection="row" justifyContent="space-between">
                <Stack flexDirection="row" gap={8}>
                  <Center>
                    <Icon name="colorLabelIcon-target" />
                  </Center>
                  <Center>
                    <Text level="subhead" weight="bold" style={styles.title}>
                      Streak
                    </Text>
                  </Center>
                </Stack>
              </Stack>

              {/* TODO: add divider */}

              <Text level="footnote">streak days</Text>
            </Stack>
          </Box>
        </Stack>
        <Spacer height={40} />

        {!isGuest && (
          <Button
            title="Log out"
            variant="secondary_coral"
            onPress={handleLogout}
            leadingIcon="logout"
          />
        )}
        <Spacer height={64} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  constainer: {
    padding: 16,
  },
  title: {
    color: globalStyles.colors.neutral[800],
  },
  subhead1: {
    color: globalStyles.colors.neutral[500],
  },
  caption1: {
    color: globalStyles.colors.neutral[400],
  },
});
export default ProfileScreen;
