import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import { Text } from "@src/components/ui/typography";
import GoalPicker from "@src/components/ui/GoalPicker/GoalPicker";
import { theme } from "@src/styles/theme";
import BackButton from "@src/components/ui/BackButton";
import Image from "../ui/Image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { height } = Dimensions.get("screen");

type GoalSliderProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

const SetGoalSlider: React.FC<GoalSliderProps> = ({ changePage }) => {
  const [goal, setGoal] = useState<number>(80);
  const setDailyGoal = useUser((state) => state.setDailyGoal);
  const completeSetup = useUser((state) => state.completeSetup);

  const updateGoal = () => {
    setDailyGoal(goal);
    completeSetup();
    changePage("signup");
  };

  const maybeLater = () => {
    changePage("signup");
  };

  const goBack = () => {
    changePage("setupGoal");
  };

  const footerFadeIn = useSharedValue(0);
  const scaleImage = useSharedValue(0);

  useEffect(() => {
    footerFadeIn.value = withTiming(1, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    scaleImage.value = withDelay(200, withTiming(1, { duration: 600 }));
  }, []);

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerFadeIn.value,
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleImage.value }],
  }));

  return (
    <Stack py={16} pt={height * 0.06} flex={1}>
      <ContentHeader onBack={goBack} />
      <Animated.View style={[imageStyle]}>
        <Stack h={height * 0.2} pt={height * 0.01}>
          <Image name="wallie-with-a-map" />
        </Stack>
      </Animated.View>
      <Stack
        gap={height * 0.01}
        style={{ position: "absolute", bottom: height * 0.03 }}
      >
        <ContentBody goal={goal} setGoal={setGoal} />
        <Animated.View style={[footerStyle]}>
          <ContentFooter onUpdateGoal={updateGoal} onMaybeLater={maybeLater} />
        </Animated.View>
      </Stack>
    </Stack>
  );
};

type ContentHeaderProps = {
  onBack: () => void;
};

const ContentHeader: React.FC<ContentHeaderProps> = ({ onBack }) => (
  <Stack
    flexDirection="row"
    gap={32}
    alignItems="center"
    justifyContent="space-between"
    flexGrow={0}
    w="100%"
    style={styles.paddedContent}
  >
    <BackButton onBack={onBack} />
    <Text style={styles.content} level="title_2" align="center">
      Set your daily goal
    </Text>
    <Stack w={40} h={40} />
  </Stack>
);

type ContentBodyProps = {
  goal: number;
  setGoal: React.Dispatch<React.SetStateAction<number>>;
};

const ContentBody: React.FC<ContentBodyProps> = ({ goal, setGoal }) => (
  <Stack flexGrow={1} justifyContent="center" alignItems="center">
    <GoalPicker flex={4} setGoal={setGoal} goal={goal} source={"setup"} />
  </Stack>
);

type ContentFooterProps = {
  onUpdateGoal: () => void;
  onMaybeLater: () => void;
};

const ContentFooter: React.FC<ContentFooterProps> = ({
  onUpdateGoal,
  onMaybeLater,
}) => (
  <Stack flexGrow={0} alignItems="center" style={styles.paddedContent}>
    <Stack pb={20} gap={16}>
      <Button
        trailingIcon="sparkle"
        title="I’m all set"
        onPress={onUpdateGoal}
        variant="primary"
      />
      <Button title="Maybe Later" onPress={onMaybeLater} variant="secondary" />
    </Stack>
  </Stack>
);

const styles = StyleSheet.create({
  main: {
    height: "100%",
  },
  content: {
    flexGrow: 2,
    color: theme.colors.primary[900],
  },
  paddedContent: {
    paddingHorizontal: 16,
  },
});

export default SetGoalSlider;
