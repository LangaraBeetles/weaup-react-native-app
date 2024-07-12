import React from "react";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Button from "@src/components/ui/Button";
import useAuth from "@src/components/hooks/useAuth";
import Stack from "@src/components/ui/Stack";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Spacer from "@src/components/ui/Spacer";
import UserCard from "@src/components/profile/UserCard";
import PostureScoreCard from "@src/components/profile/PostureScoreCard";
import XPCard from "@src/components/profile/XPCard";
import BadgesCard from "@src/components/profile/BadgesCard";
import DailyGoalCard from "@src/components/profile/DailyGoalCard";
import StreakCard from "@src/components/profile/StreakCard";
import { Text } from "@src/components/ui/typography";

const ProfileScreen = () => {
  const isGuest = useUser((data) => data.isGuest);
  const setAuth = useUser((data) => data.setAuth);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    setAuth(false);
    logout();
    router.replace("/");
  };

  const login = () => {
    router.navigate("/signin");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
      {/* <View style={styles.background} /> */}
      <View style={styles.innerContainer}>
        <Stack gap={20}>
          {/* <UserCard />
          <PostureScoreCard />
          <XPCard />
          <BadgesCard />
          <DailyGoalCard />
          <StreakCard /> */}
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
      {/* </ScrollView> */}
    </SafeAreaView>
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
