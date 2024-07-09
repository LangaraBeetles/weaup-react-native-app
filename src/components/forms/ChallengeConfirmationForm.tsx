import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFormContext } from "react-hook-form";

import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { Text } from "@src/components/ui/typography";
import { createChallenge } from "@src/services/challengeApi";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import CloseButton from "../ui/CloseButton";

const ChallengeConfirmationForm = () => {
  const { handleSubmit, getValues, setValue } =
    useFormContext<ChallengeInputType>();
  const [start_at, end_at, duration, name] = getValues([
    "start_at",
    "end_at",
    "duration",
    "name",
  ]);

  const validate = (data: ChallengeInputType) => {
    createChallenge(data)
      .then((res) => {
        setValue("url", res.data.url);
        setValue("step", "result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={42} p={16} alignItems="center">
        <CloseButton
          icon="arrow-left"
          onClose={() => setValue("step", "goal")}
        />
        <Text style={styles.content} level="title_2">
          All set?
        </Text>
        <Stack w={40} h={40} />
      </Stack>

      <Stack px={16} h="100%" justifyContent="space-around" alignItems="center">
        <Stack alignItems="center">
          <Text>{name}</Text>
          <Text>{duration} days</Text>
          <Text>
            From {start_at} to {end_at}
          </Text>
        </Stack>

        <Button
          variant="primary"
          title="Create Challenge"
          onPress={handleSubmit(validate)}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 20,
    justifyContent: "space-between",
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

export default ChallengeConfirmationForm;
