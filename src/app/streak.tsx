import StreakNotificationCard from "@src/components/streak/StreakNotificationCard";
import Button from "@src/components/ui/Button";
import Spacer from "@src/components/ui/Spacer";
import { getAnalytics } from "@src/services/analyticsApi";
import { useUser } from "@src/state/useUser";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const StreakScreen = () => {
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const router = useRouter();
  const setDailyStreakCounter = useUser((state) => state.setDailyStreakCounter);
  const dailyStreak = useUser((state) => state.user.dailyStreakCounter);
  const userXP = useUser((state) => state.user.xp);
  const setUserXP = useUser((state) => state.setXP);
  const [, setIsDailyStreak] = useState(false);

  useEffect(() => {
    const setStreak = async () => {
      try {
        const today = dayjs();
        const analyticsData = await getAnalytics(today.format());

        if (dailyStreak === 1) {
          setUserXP(userXP + 100);
          return;
        }

        const lastSession =
          analyticsData.sessions[analyticsData.sessions.length - 1];
        const lastSessionDate = lastSession?.ended_at;

        if (lastSessionDate) {
          if (!today.isSame(dayjs(lastSessionDate))) {
            console.log("New day, increment streak");

            // New day, increment streak
            setIsDailyStreak(true);
            if (userStreak === 7) {
              setUserXP(userXP + 1000);
              setDailyStreakCounter(1);
            } else {
              setUserXP(userXP + 100);
              setDailyStreakCounter(userStreak + 1);
            }
          } else {
            console.log("Same day, maintain streak");

            // Same day, maintain streak
            setIsDailyStreak(false);
            setDailyStreakCounter(userStreak);
          }
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    setStreak();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../animations/confetti.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <View style={styles.content}>
        <Spacer height={160} />
        <StreakNotificationCard streak={userStreak} />
        <Spacer height={115} />
        <View style={styles.button}>
          <Button title="Continue" onPress={() => router.replace("/")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 230,
    alignSelf: "center",
  },
  animation: {
    position: "absolute",
    width: "100%",
    height: "110%",
    zIndex: -1,
    top: -150,
  },
});

export default StreakScreen;
