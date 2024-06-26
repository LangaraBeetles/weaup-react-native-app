import { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { Text } from "@src/components/ui/typography";
import { createChallenge } from "@src/services/challengeApi";
import { useFormContext } from "react-hook-form";
import { ChallengeType } from "@src/interfaces/challenge.types";

const ChallengeConfirmationForm = (props: any) => {
  const { challenge, handleChallenge, handleStep, setUrl } = props;

  const { control, handleSubmit } = useFormContext<ChallengeType>();

  useEffect(() => {
    const endDate = new Date(challenge.start_at);
    endDate.setDate(endDate.getDate() + Number(challenge.duration));
    handleChallenge("end_at", endDate.toDateString());
  }, []);

  const addChallenge = () => {
    // createChallenge(challenge)
    //   .then((res) => {
    //     setUrl(res.data.url);
    //     handleStep(3);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    handleSubmit((data) => {
      console.log({ data });
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
          <Text>{challenge.name}</Text>
          <Text>Spans {challenge.duration} days</Text>
          <Text>
            From {challenge.start_at} to {challenge.end_at}
          </Text>
        </Stack>

        <Button
          type={{ type: "primary", size: "l" }}
          title="Create Challenge"
          onPress={addChallenge}
        ></Button>
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
