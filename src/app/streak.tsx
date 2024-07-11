import StreakNotificationCard from "@src/components/streak/StreakNotificationCard";
import Button from "@src/components/ui/Button";
import Spacer from "@src/components/ui/Spacer";
import { useUser } from "@src/state/useUser";
import { useRouter, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

const StreakScreen = () => {
  const { sessionParams } = useLocalSearchParams<{ sessionParams: string }>();
  const userStreak = useUser((state) => state.user.dailyStreakCounter);
  const router = useRouter();

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
          <Button
            title="Continue"
            onPress={() =>
              router.replace({
                pathname: "session-summary",
                params: { sessionParams },
              })
            }
          />
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
