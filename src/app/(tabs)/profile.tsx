import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Button from "@src/components/ui/Button";
import useAuth from "@src/components/hooks/useAuth";
import Stack from "@src/components/ui/Stack";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Spacer from "@src/components/ui/Spacer";
import UserCard from "@src/components/profile/UserCard";
import PostureScoreCard from "@src/components/profile/PostureScoreCard";
import XPCard from "@src/components/profile/XPCard";
import BadgesCard from "@src/components/profile/BadgesCard";
import DailyGoalCard from "@src/components/profile/DailyGoalCard";
import StreakCard from "@src/components/profile/StreakCard";
import AppTutorialCard from "@root/src/components/profile/AppTutorialCard";
import { getUserById } from "@root/src/services/userApi";
import { useMutation } from "@tanstack/react-query";

const ProfileScreen = () => {
  const userId = useUser((data) => data.user.id);
  const isGuest = useUser((data) => data.isGuest);
  const setAuth = useUser((data) => data.setAuth);
  const router = useRouter();
  const { logout } = useAuth();

  const setDailyGoal = useUser((data) => data.setDailyGoal);
  const setXP = useUser((data) => data.setXP);
  const setHP = useUser((data) => data.setHP);
  const setLevel = useUser((data) => data.setLevel);
  const setBadge = useUser((data) => data.setBadge);
  const setDailyStreakCounter = useUser((data) => data.setDailyStreakCounter);

  const handleLogout = async () => {
    setAuth(false);
    logout();
    router.replace("/");
  };

  const login = () => {
    router.navigate("/signin");
  };

  const { mutate } = useMutation({
    mutationKey: ["get-user", userId],
    mutationFn: (userId: string) => getUserById(userId),
    onSuccess: (data) => {
      if (data) {
        setDailyGoal(data.data?.daily_goal);
        setXP(data.data?.xp);
        setHP(data.data?.hp);
        setLevel(data.data?.level);
        
        setDailyStreakCounter(data.data?.daily_streak_counter || 0);
        data.data?.badges?.forEach((element: { id: number; date: string }) => {
          setBadge(element);
        });
      }
    },
    onError: (error) => {
      console.log({ error });
    },
    onSettled: () => {},
  });

  const refetchUserData = () => {
    mutate(userId);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={refetchUserData} />
      }
    >
      <View style={styles.background} />
      <View style={styles.innerContainer}>
        <Spacer height={64} />
        <Stack gap={20}>
          <UserCard />
          <PostureScoreCard />
          <XPCard />
          <BadgesCard />
          <DailyGoalCard />
          <StreakCard />
          <AppTutorialCard />
        </Stack>
        <Spacer height={40} />

        {!isGuest ? (
          <Button
            title="Log out"
            variant="secondary_coral"
            onPress={handleLogout}
            leadingIcon="logout"
          />
        ) : (
          <Button title="Log in" onPress={login} variant="secondary" />
        )}
        <Spacer height={20} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalStyles.colors.primary[200],
    position: "relative",
  },
  innerContainer: {
    padding: 16,
  },
  background: {
    backgroundColor: globalStyles.colors.surface,
    position: "absolute",
    top: 195,
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
});
export default ProfileScreen;
