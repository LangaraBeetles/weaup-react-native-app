import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import CloseButton from "../ui/CloseButton";
import { theme } from "@src/styles/theme";

const ChallengeGoalForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormContext<ChallengeInputType>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
          // h="100%"
          gap={40}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text align="center" style={{ color: theme.colors.neutral[400] }}>
            A score setting of 70–85% of good posture is perfect for beginners.
          </Text>

          <Stack gap={40} w="100%" backgroundColor="blue" h="80%">
            <Controller
              control={control}
              defaultValue="80"
              name="goal"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Stack w="100%" gap={2} px={40}>
                  <TextInput
                    inputMode="numeric"
                    keyboardType="numeric"
                    placeholder="80"
                    {...field}
                    onChangeText={field.onChange}
                    style={{
                      backgroundColor: theme.colors.neutral[100],
                      fontSize: 30,
                      width: "100%",
                      padding: 12,
                      borderRadius: 8,
                      textAlign: "center",
                    }}
                  />
                  {errors.goal && (
                    <Text
                      align="center"
                      style={{ color: theme.colors.error[500] }}
                    >
                      This is required
                    </Text>
                  )}
                </Stack>
              )}
            />

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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 20,
    // justifyContent: "space-between",
    backgroundColor: "red",
  },
  content: {
    flexGrow: 2,
  },
});

export default ChallengeGoalForm;
