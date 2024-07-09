import { styled } from "@fast-styles/react";
import Image from "@src/components/ui/Image";
import { View } from "react-native";
import { Text } from "@src/components/ui/typography";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import StreakDaysIndicator from "@src/components/streak/StreakDaysIndicator";

const StreakNotificationCard: React.FC<{
  streak: number;
}> = ({ streak }) => {
  return (
    <StreakNotificationRoot>
      <Stack alignItems="center" justifyContent="space-between">
        <StreakFlames>
          <Image name="streak-flames" />
        </StreakFlames>
        <StreakCounter>{streak}</StreakCounter>
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
  position: "absolute",
  top: -15,
});

const StreakCounter = styled(Text, {
  fontSize: 140,
  position: "relative",
});

const StreakText = styled(Text, {
  position: "absolute",
  bottom: -10,
});
