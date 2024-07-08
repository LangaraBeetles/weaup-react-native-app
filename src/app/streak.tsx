import StreakNotificationCard from "@src/components/streak/StreakNotificationCard";
import Spacer from "@src/components/ui/Spacer";
import { useUser } from "@src/state/useUser";
// import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StreakScreen = () => {
  const userStreak = useUser((state) => state.user.dailyStreakCounter);

  return (
    <SafeAreaView>
      <Spacer height={160} />
      <StreakNotificationCard streak={userStreak} />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({});

export default StreakScreen;
