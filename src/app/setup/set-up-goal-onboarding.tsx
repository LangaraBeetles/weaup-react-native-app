import { useState } from "react";
import { Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";

import Button from "@src/components/ui/Button";
import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import { Text } from "@src/components/ui/typography";
import GoalPicker from "@src/components/ui/GoalPicker/GoalPicker";
import { theme } from "@src/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "@src/components/ui/BackButton";

const { height } = Dimensions.get("screen");

const SetUpGoalScreenOnboarding = () => {
  const setDailyGoal = useUser((state) => state.setDailyGoal);
  const completeSetup = useUser((state) => state.completeSetup);
  const [goal, setGoal] = useState(80);

  const updateGoal = () => {
    setDailyGoal(goal);
    completeSetup();
    router.push("/setup/signup");
  };

  const maybeLater = () => {
    router.push("/setup/signup");
  };

  return (
    <SafeAreaView style={styles.main}>
      <LinearGradient
        colors={[
          theme.colors.primary[200],
          theme.colors.white,
          theme.colors.white,
          theme.colors.primary[100],
          theme.colors.primary[200],
        ]}
        locations={[0.2, 0.4, 0.6, 0.8, 1]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "120%",
          zIndex: -1,
        }}
      />

      <Stack
        py={16}
        pt={Platform.OS === "android" ? height * 0.08 : 16}
        flex={1}
      >
        <Stack flexGrow={1}>
          <Stack
            flexDirection="row"
            gap={32}
            alignItems="center"
            flexGrow={0}
            style={styles.paddedContent}
          >
            <BackButton />

            <Text style={styles.content} level="title_2">
              Set your daily goal
            </Text>

            <Stack w={40} h={40} />
          </Stack>

          <Stack flexGrow={1} justifyContent="center" alignItems="center">
            <GoalPicker flex={4} setGoal={setGoal} goal={goal} />
          </Stack>

          <Stack flexGrow={0} alignItems="center" style={styles.paddedContent}>
            <Stack pb={20} gap={16}>
              <Button
                trailingIcon="sparkle"
                title="I’m all set"
                onPress={updateGoal}
                variant="primary"
              />
              <Button
                title="Maybe Later"
                onPress={maybeLater}
                variant="secondary"
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

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

export default SetUpGoalScreenOnboarding;
