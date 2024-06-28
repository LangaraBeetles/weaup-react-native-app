import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Controller, useFormContext } from "react-hook-form";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { ChallengeInputType } from "@src/interfaces/challenge.types";

const ChallengeGoalForm = (props: any) => {
  const { handleStep } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ChallengeInputType>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.main}>
        <Stack flexDirection="row" gap={18} p={16} justifyContent="flex-start">
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => handleStep(0)}
              style={styles.closeButton}
            >
              <Image source={require("../../../assets/img/backIcon.png")} />
            </TouchableOpacity>
          </View>
          <Text style={styles.content} level="title_2">
            Choose team's goal
          </Text>
        </Stack>

        <Stack
          flexDirection="column"
          px={16}
          h={"100%"}
          justifyContent="space-around"
          alignItems="center"
        >
          <Text>
            A score setting of 70–85% of good posture is perfect for beginners.
          </Text>
          <Controller
            control={control}
            defaultValue={"80"}
            name="goal"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextInput
                inputMode="numeric"
                keyboardType="numeric"
                placeholder="80"
                {...field}
                onChangeText={field.onChange}
                style={{
                  backgroundColor: "#D9D9D9",
                  fontSize: 30,
                  width: "80%",
                  padding: 12,
                  borderRadius: 8,
                  textAlign: "center",
                }}
              />
            )}
          />
          {/* TODO: change based on design flow */}
          {errors.goal && <Text>This is required.</Text>}

          <Button
            type={{ type: "primary", size: "l" }}
            title="Next"
            onPress={handleSubmit(() => {
              handleStep(2);
            })}
          ></Button>
        </Stack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 20,
  },
  content: {
    flexGrow: 2,
  },
  button: {
    flexGrow: 1,
  },
  closeButton: {
    width: 49.5,
    height: 49.5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChallengeGoalForm;
