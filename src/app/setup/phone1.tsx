import React, { useState } from "react";
import { router } from "expo-router";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "@src/components/ui/typography";
import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";

const { height, width } = Dimensions.get("screen");

const PhoneTrainingScreen = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Hold your phone",
      text: "Try hold it upright at 90 degrees.\nThis is your ideal posture!",
      rotation: "-15deg",
    },
    {
      title: "Now, try bend it",
      text: "Yes, hold it like you normally do.\nNotice the alerts or vibrations?\nWeaUp will notify you whenever your neck is suffering from the wrong posture.",
      rotation: "-41deg",
    },
    {
      title: "A 10-degree tilt?\n It’s fine!",
      text: "Don’t worry, we won't alert you if your phone angle is no less than 80 degrees.",
      rotation: "-10deg",
    },
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/setup/set-up-goal1");
    }
  };
  const skip = () => {
    router.push("/setup/set-up-goal1");
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <Stack
          style={{
            position: "absolute",
            top: Platform.OS === "android" ? height * 0.08 : height * 0.04,
            right: width * 0.07,
            zIndex: 2,
          }}
        >
          <TouchableOpacity onPress={skip}>
            <Text level="headline" style={{ color: theme.colors.neutral[500] }}>
              Skip
            </Text>
          </TouchableOpacity>
        </Stack>
        <Gradient
          color1={theme.colors.primary[300]}
          color2={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 1,
          }}
        />
        <Gradient
          color2={theme.colors.primary[300]}
          color1={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 3,
          }}
        />
        <Center
          w={236}
          h={456}
          style={{
            marginHorizontal: "auto",
            marginTop: height * 0.08,
            zIndex: 2,
          }}
        >
          <Stack
            w={20}
            h={128}
            style={{
              ...styles.phone,
              transform: [{ rotate: steps[step].rotation }],
            }}
          />
          {step === 1 && (
            <Stack style={{ position: "absolute", top: -5, left: -40 }}>
              <Image name="tilt-arrow" width={62} height={43} />
            </Stack>
          )}
          {step === 2 && (
            <>
              <Stack style={{ position: "absolute", top: 8, left: 5 }}>
                <Image name="tilt-correct" width={22} height={15} />
              </Stack>
              <Stack
                w={20}
                h={128}
                style={{
                  ...styles.phoneCorrect,
                }}
              />
            </>
          )}
          <Image name="weasel-happy" />
        </Center>
        <Stack style={styles.content}>
          <Center
            justifyContent="center"
            height="100%"
            py={height * 0.04}
            px={20}
          >
            <Stack gap={32}>
              <Stack gap={16}>
                <Text
                  align="center"
                  level="title_1"
                  style={{ color: theme.colors.primary[900] }}
                >
                  {steps[step].title}
                </Text>
                <Text align="center">{steps[step].text}</Text>
              </Stack>
            </Stack>
          </Center>
        </Stack>
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
    top: height > 852 ? height * 0.42 : height * 0.4,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
    zIndex: 4,
  },
  phone: {
    position: "absolute",
    top: 25,
    left: 0,
    borderRadius: 5,
    backgroundColor: theme.colors.other[100],
    zIndex: 2,
  },
  phoneCorrect: {
    position: "absolute",
    top: 25,
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
