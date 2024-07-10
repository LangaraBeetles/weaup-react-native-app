import { useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useNavigation } from "@react-navigation/native";

import Main from "@src/components/layout/Main";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import useAuth from "@src/components/hooks/useAuth";
import { useUser } from "@src/state/useUser";
import { Text } from "@src/components/ui/typography";
import GoalPicker from "@src/components/ui/GoalPicker/GoalPicker.";
import Icon from "@src/components/ui/Icon";
import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";

const SetUpGoalScreen3 = () => {
  const navigation = useNavigation();
  const completeSetup = useUser((state) => state.completeSetup);
  const setDailyGoal = useUser((state) => state.setDailyGoal);
  const [goal, setGoal] = useState(80);

  const isAuth = useUser((data) => data.isAuth);
  const { createGuestUser } = useAuth();

  const handleButtonPress = () => {
    completeSetup();
    if (!isAuth) {
      createGuestUser();
    }
    router.navigate("/setup/welcome");
  };

  const skip = () => {
    handleButtonPress();
  };

  const updateGoal = () => {
    setDailyGoal(goal);
    handleButtonPress();
  };

  const { height, width } = Dimensions.get("screen");

  return (
    <SafeAreaView>
      <Stack
        flexDirection="row"
        alignItems="center"
        style={{
          position: "absolute",
          top: Platform.OS === "android" ? height * 0.08 : height * 0.04,
          left: width * 0.07,
          zIndex: 2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flex: 1 }}
        >
          <Icon name={"arrow-left"} size={40} />
        </TouchableOpacity>
        <Text level="title_2" style={{ flex: 7 }}>
          Set your daily goal
        </Text>
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
          height: "60%",
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
          height: "40%",
        }}
      />
      <Main>
        <Center justifyContent="center" height="100%" pt={100} pb={26}>
          <Stack gap={4} justifyContent="space-around" h="100%">
            <GoalPicker flex={4} setGoal={setGoal} goal={goal} />
            <Stack gap={20} flex={1}>
              <Button
                trailingIcon="sparkle"
                title="I’m all set"
                onPress={updateGoal}
                variant="primary"
              />
              <Button title="Maybe Later" onPress={skip} variant="secondary" />
            </Stack>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default SetUpGoalScreen3;
