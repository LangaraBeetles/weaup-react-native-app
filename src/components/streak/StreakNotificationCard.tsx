import { styled } from "@fast-styles/react";
import { Dimensions, View } from "react-native";
import { Text } from "@src/components/ui/typography";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import StreakDaysIndicator from "@src/components/streak/StreakDaysIndicator";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("screen");

const StreakNotificationCard: React.FC<{
  streak: number;
}> = ({ streak }) => {
  const streakVariant = streak === 4 ? "four" : "default";

  return (
    <View>
      <Stack alignItems="center" justifyContent="space-between">
        <View>
          <LottieView
            autoPlay={true}
            loop={false}
            speed={0.05}
            duration={13000}
            style={{
              width: 200,
              height: 220,
              zIndex: 2,
              bottom: -10,
            }}
            source={require("../../animations/flame.json")}
          />
        </View>
        <View
          style={{
            flex: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StreakCounter variant={streakVariant}>{streak}</StreakCounter>
        </View>
        <Spacer height={16} />
        <StreakText level="title_1">day streak!</StreakText>
        <Spacer height={48} />
      </Stack>
      <View style={{ paddingHorizontal: width * 0.06 }}>
        <StreakDaysIndicator streak={streak} />
      </View>
    </View>
  );
};

export default StreakNotificationCard;

const StreakCounter = styled(Text, {
  fontSize: 140,
  height: 104,
  lineHeight: 150,
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
  height: 36,
});
