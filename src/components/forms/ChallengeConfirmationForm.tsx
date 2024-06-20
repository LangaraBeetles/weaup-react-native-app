import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";

const ChallengeConfirmationForm = (props: any) => {
  const { handleCloseModalPress, handleStep } = props;

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={18} p={16} justifyContent="flex-start">
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleCloseModalPress}
            style={styles.closeButton}
          >
            <Image source={require("../../../assets/img/closeIcon.png")} />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>All set?</Text>
      </Stack>

      <Stack
        px={16}
        h={"100%"}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack alignItems="center">
          <Text>New Challenge</Text>
          <Text>Spans 3 days</Text>
          <Text>From June 21 to June 23</Text>
        </Stack>

        <Button
          type={{ type: "primary", size: "l" }}
          title="Create Challenge"
          onPress={() => handleStep(3)}
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
