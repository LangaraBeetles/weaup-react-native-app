import React, { useState } from "react";
import { router } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import ContentCard from "@src/components/setup/ContentCard";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";

const { height, width } = Dimensions.get("screen");

const PhoneTrainingScreen = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Gain Your Daily Progress with Weabo",
      text: "Gain daily progress by improving your posture score and finishing sessions with your posture pal Weabo.",
    },
    {
      title: "Achieve you Daily Goal and Level Up",
      text: "You can earn XP by achieving your daily score goal and complete sessions.\nLevel up and unlock badges and other exciting rewards as you progress.",
      rotation: "-41deg",
    },
    {},
  ];

  const next = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      router.push("/setup/set-up-goal-onboarding");
    }
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <BackgroundGradient />
        <Center
          w={236}
          h={456}
          style={{
            marginTop: height * 0.08,
            zIndex: 2,
          }}
        >
          {step === 0 && (
            <>
              <Stack
                w={250}
                h={500}
                style={{
                  borderRadius: 12,
                  position: "absolute",
                  top: 10,
                  right: 10,
                  transform: [{ rotate: "-7deg" }],
                }}
              >
                <Image name="home-screen-image" style={{ opacity: 0.8 }} />
              </Stack>
              <Stack
                w={236}
                h={456}
                style={{
                  marginTop: height * 0.15,
                  left: width * 0.2,
                }}
              >
                <Image name="weasel-happy" />
              </Stack>
            </>
          )}
          {step === 1 && (
            <>
              <Stack
                w={360}
                h={190}
                style={{
                  position: "absolute",
                  top: 40,
                  transform: [{ rotate: "-5deg" }],
                }}
              >
                <Image name="profile-XP-image" />
              </Stack>
              <Stack
                w={115}
                h={123}
                style={{
                  top: -10,
                }}
              >
                <Image name="level-up-image" />
              </Stack>
            </>
          )}
        </Center>
        <ContentCard title={steps[step].title} text={steps[step].text} />
        <Stack style={styles.navigation} flexDirection={"row"} gap={8}>
          {steps.map((_, index) => (
            <Stack
              key={index}
              w={index === step ? 40 : 16}
              h={8}
              style={index === step ? styles.activeNav : styles.inactiveNav}
            />
          ))}
        </Stack>
        <Stack style={styles.button} w={step < steps.length - 1 ? 137 : 230}>
          <Button
            trailingIcon={step < steps.length - 1 ? "chevron-right" : undefined}
            onPress={next}
            variant="primary"
            title={step < steps.length - 1 ? "" : "Continue"}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: height * 0.42,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 20,
    zIndex: 4,
  },
  phone: {
    position: "absolute",
    top: 80,
    left: 0,
    borderRadius: 5,
    backgroundColor: theme.colors.other[100],
    zIndex: 2,
  },
  phoneCorrect: {
    position: "absolute",
    top: 80,
    left: 25,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.other[100],
    borderStyle: "dashed",
    zIndex: 2,
  },
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
  navigation: {
    position: "absolute",
    bottom: height * 0.24,
    left: width * 0.5,
    transform: [{ translateX: -44 }],
    zIndex: 5,
  },
  button: {
    position: "absolute",
    bottom: height * 0.12,
    zIndex: 4,
  },
});

export default PhoneTrainingScreen;
