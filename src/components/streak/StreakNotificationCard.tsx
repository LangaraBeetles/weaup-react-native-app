import { styled } from "@fast-styles/react";
import { View } from "react-native";
import { Text } from "@src/components/ui/typography";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import StreakDaysIndicator from "@src/components/streak/StreakDaysIndicator";
import LottieView from "lottie-react-native";

const StreakNotificationCard: React.FC<{
  streak: number;
}> = ({ streak }) => {
  const streakVariant = streak === 4 ? "four" : "default";

  return (
    <StreakNotificationRoot>
      <Stack alignItems="center" justifyContent="space-between">
        <StreakFlames>
          <LottieView
            autoPlay={true}
            loop={false}
            speed={0.05}
            duration={13000}
            style={{
              width: 100,
              height: 200,
              zIndex: 2,
            }}
            source={require("../../animations/flame.json")}
          />
        </StreakFlames>
        <StreakCounter variant={streakVariant}>{streak}</StreakCounter>
        <StreakText level="title_1">day streak!</StreakText>
      </Stack>
      <Spacer height={60} />
      <StreakDaysIndicator streak={streak} />
    </StreakNotificationRoot>
  );
};

export default StreakNotificationCard;

const StreakNotificationRoot = styled(View, {
  width: "100%",
  paddingHorizontal: 32,
});

const StreakFlames = styled(View, {
  height: 74,
  width: 74,
  top: -60,
  paddingBottom: "25%",
  alignItems: "center",
});

const StreakCounter = styled(Text, {
  fontSize: 140,
  fontFamily: "NunitoBold",
  variants: {
    variant: {
      default: {
        right: 0,
      },
      four: {
        right: 8,
      },
    },
  },
});

const StreakText = styled(Text, {
  position: "absolute",
  bottom: -10,
});
