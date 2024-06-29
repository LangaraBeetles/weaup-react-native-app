import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useFormContext } from "react-hook-form";

import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { Text } from "@src/components/ui/typography";
import { createChallenge } from "@src/services/challengeApi";
import { ChallengeInputType } from "@src/interfaces/challenge.types";

const ChallengeConfirmationForm = (props: any) => {
  const { handleStep, setUrl } = props;
  const { handleSubmit, getValues } = useFormContext<ChallengeInputType>();
  const [start_at, end_at, duration, name] = getValues([
    "start_at",
    "end_at",
    "duration",
    "name",
  ]);

  const validate = (data: ChallengeInputType) => {
    createChallenge(data)
      .then((res) => {
        setUrl(res.data.url);
        handleStep(3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={18} p={16} justifyContent="flex-start">
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => handleStep(1)}
            style={styles.closeButton}
          >
            <Image source={require("../../../assets/img/backIcon.png")} />
          </TouchableOpacity>
        </View>
        <Text style={styles.content} level="title_2">
          All set?
        </Text>
      </Stack>

      <Stack
        px={16}
        h={"100%"}
        justifyContent="space-around"
        alignItems="center"
      >
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
