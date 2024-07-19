import { View, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import CloseButton from "../ui/CloseButton";
import GoalPicker from "../ui/GoalPicker/GoalPicker";
import { useEffect, useState } from "react";
import PointsCard from "../ui/GoalPicker/PointsCard";

const ChallengeGoalForm = () => {
  const { control, handleSubmit, setValue, getValues } =
    useFormContext<ChallengeInputType>();
  const challenge = getValues();

  const [points, setPoints] = useState(0);

  useEffect(() => {
    setPoints(Number(challenge?.goal) * Number(challenge?.duration) * 10);
  }, [challenge]);

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={42} p={16} alignItems="center">
        <CloseButton
          icon="arrow-left"
          onClose={() => setValue("step", "detail")}
        />
        <Text style={styles.content} level="title_2">
          Choose team's goal
        </Text>
        <Stack w={40} h={40} />
      </Stack>

      <Stack
        flexDirection="column"
        px={16}
        flexGrow={1}
        gap={40}
        alignItems="center"
      >
        <Stack
          w="100%"
          flexGrow={1}
          gap={12}
          justifyContent="center"
          alignItems="center"
        >
          <Controller
            control={control}
            defaultValue="80"
            name="goal"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Stack justifyContent="center" h={550} alignItems="center">
                <GoalPicker
                  flex={4}
                  setGoal={field.onChange}
                  goal={Number(field.value)}
                />
              </Stack>
            )}
          />
          <PointsCard points={points} />
        </Stack>
        <Stack flexGrow={0} justifyContent="flex-end">
          <Button
            variant="primary"
            title="Next"
            onPress={handleSubmit(() => {
              setValue("step", "confirmation");
            })}
          />
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 40,
  },
  content: {
    flexGrow: 2,
  },
});

export default ChallengeGoalForm;
