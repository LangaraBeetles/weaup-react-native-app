import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import Stack from "../ui/Stack";
import Button from "@src/components/ui/Button";

const ChallengeGoalForm = (props: any) => {
  const { handleCloseModalPress, handleStep } = props;

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={18} p={16} justifyContent="flex-start">
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => handleCloseModalPress()}
            style={styles.closeButton}
          >
            <Image source={require("../../../assets/img/closeIcon.png")} />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>Choose team's goal</Text>
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
        <TextInput placeholder="80%"></TextInput>

        <Button
          type={{ type: "primary", size: "l" }}
          title="Next"
          onPress={() => handleStep(2)}
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

export default ChallengeGoalForm;
