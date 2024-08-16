import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image as RNImage } from "react-native";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import ContentCard from "@src/components/setup/ContentCard";
import BackButton from "../ui/BackButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

const { height } = Dimensions.get("screen");

type SetupGoalProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  setBackGround: React.Dispatch<React.SetStateAction<string>>;
};

const SetupGoal: React.FC<SetupGoalProps> = ({ changePage, setBackGround }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Gain Your Daily Progress with Wally",
      text: "Gain daily progress by improving your posture score and finishing sessions with your posture pal Wally.",
    },
    {
      title: "Achieve your Daily Goal and Level Up",
      text: "You can earn XP by achieving your daily score goal and complete sessions.\nLevel up and unlock badges and other exciting rewards as you progress.",
    },
    {},
  ];

  const cardOpacity = useSharedValue(0);
  const xpBarOpacity = useSharedValue(0);
  const streakCardOpacity = useSharedValue(0);

  const levelUpImageOpacity = useSharedValue(0);
  const badgeImageOpacity = useSharedValue(0);
  const badgeImageTranslation = useSharedValue(-50);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
  }));

  const xpBarStyle = useAnimatedStyle(() => ({
    opacity: xpBarOpacity.value,
  }));

  const streakCardStyle = useAnimatedStyle(() => ({
    opacity: streakCardOpacity.value,
  }));

  const levelUpImageStyle = useAnimatedStyle(() => ({
    opacity: levelUpImageOpacity.value,
  }));

  const badgeImageStyle = useAnimatedStyle(() => ({
    opacity: badgeImageOpacity.value,
    transform: [{ translateX: badgeImageTranslation.value }],
  }));

  useEffect(() => {
    setBackGround(theme.colors.other[300]);
    cardOpacity.value = withTiming(1, { duration: 500 });

    xpBarOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));

    streakCardOpacity.value = withDelay(1000, withTiming(1, { duration: 500 }));
  }, []);

  const next = () => {
    if (step === 0) {
      xpBarOpacity.value = withTiming(0, { duration: 500 });
      streakCardOpacity.value = withTiming(0, { duration: 500 });

      levelUpImageOpacity.value = withDelay(
        500,
        withTiming(1, { duration: 500 }),
      );

      badgeImageOpacity.value = withDelay(
        800,
        withTiming(1, { duration: 500 }),
      );
      badgeImageTranslation.value = withDelay(
        800,
        withTiming(0, { duration: 500 }),
      );

      setStep(step + 1);
    } else if (step === 1) {
      cardOpacity.value = withTiming(0, { duration: 500 });
      levelUpImageOpacity.value = withTiming(0, { duration: 500 });
      badgeImageOpacity.value = withTiming(0, { duration: 500 });

      setTimeout(() => {
        runOnJS(setBackGround)(theme.colors.primary[100]);
        runOnJS(changePage)("setupGoalSlider");
      }, 300);
    }
  };

  const onBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      changePage("notifications");
    }
  };

  return (
    <Stack h={height} px={16} alignItems="center">
      <Stack
        flexDirection="row"
        pt={height * 0.06}
        w={"100%"}
        justifyContent="space-between"
        style={{ zIndex: 5 }}
      >
        <BackButton onBack={onBack} />
      </Stack>

      <Stack
        alignItems="center"
        style={{ position: "absolute", bottom: height * 0.1 }}
        gap={15}
      >
        {step === 0 && (
          <>
            <Animated.View
              style={[
                streakCardStyle,
                { position: "absolute", top: height * -0.165 },
              ]}
            >
              <Stack w={320} h={220}>
                <Image name="streak-card-setup" />
              </Stack>
            </Animated.View>
            <Animated.View style={[xpBarStyle, { width: "106%" }]}>
              <Stack h={145}>
                <Image name="xp-bar-setup" />
              </Stack>
            </Animated.View>
          </>
        )}

        {step === 1 && (
          <>
            <Animated.View
              style={[levelUpImageStyle, { top: 100, right: 40, zIndex: 3 }]}
            >
              <Stack w={228} h={228}>
                <Image name="level-up-setup" />
              </Stack>
            </Animated.View>
            <Animated.View
              style={[badgeImageStyle, { width: 109, bottom: 60, left: 80 }]}
            >
              <Stack h={121}>
                <RNImage
                  source={require("../../../assets/img/badge-goal.png")}
                  style={{ width: 108, height: 121 }}
                />
              </Stack>
            </Animated.View>
          </>
        )}

        <Animated.View style={[cardStyle]}>
          <Stack pb={26}>
            <ContentCard
              title={steps[step].title}
              text={steps[step].text}
              section={"setup"}
            />
          </Stack>
          <Stack alignItems="center" gap={20}>
            <Stack w={"100%"}>
              <Button onPress={next} variant="primary" title={"Next"} />
            </Stack>
            <Stack flexDirection={"row"} gap={8}>
              {steps.map((_, index) => (
                <Stack
                  key={index}
                  w={index === step ? 40 : 16}
                  h={8}
                  style={index === step ? styles.activeNav : styles.inactiveNav}
                />
              ))}
            </Stack>
          </Stack>
        </Animated.View>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  activeNav: {
    backgroundColor: theme.colors.primary[700],
    borderRadius: 40,
    zIndex: 4,
  },
  inactiveNav: {
    backgroundColor: theme.colors.primary[700],
    opacity: 0.25,
    borderRadius: 40,
    zIndex: 4,
  },
});

export default SetupGoal;
