import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Center from "../ui/Center";
import Stack from "../ui/Stack";
import Button from "@src/components/ui/Button";

const CreateChallengeForm = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;

  return (
    <View style={styles.main}>
      <Stack flexDirection="row" gap={18} p={16} justifyContent="flex-start">
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => handleCloseModalPress()}
            style={styles.closeButton}
          />
        </View>
        <Text style={styles.content}>Create Challenge</Text>
      </Stack>

      <Stack
        flexDirection="column"
        px={16}
        h={"100%"}
        justifyContent="flex-end"
      >
        <View style={styles.content}>
          <Stack flexDirection="column" gap={8}>
            <Center>
              <TextInput placeholder="Type Challenge Name"></TextInput>
            </Center>
            <Center>
              <Stack
                flexDirection="row"
                gap={18}
                pt={22}
                pb={28}
                justifyContent="center"
              >
                <TouchableOpacity style={styles.colorSelection1} />
                <TouchableOpacity style={styles.colorSelection2} />
                <TouchableOpacity style={styles.colorSelection3} />
                <TouchableOpacity style={styles.colorSelection4} />
              </Stack>
            </Center>
          </Stack>
        </View>
        <View style={styles.content}>
          <Stack
            flexDirection="column"
            gap={16}
            p={16}
            borderRadius={16}
            backgroundColor="#DFDFDF"
          >
            <TextInput placeholder="Description (optional)"></TextInput>
            <Stack flexDirection="row" gap={18} justifyContent="space-between">
              <Text>Start date</Text>
              <TextInput placeholder="Select date"></TextInput>
            </Stack>
            <Stack flexDirection="row" gap={18} justifyContent="space-between">
              <Text>Duration</Text>
              <TextInput placeholder="Select challenge span"></TextInput>
            </Stack>
          </Stack>
        </View>

        <View style={styles.button}>
          <Center p={24}>
            <Button type={{ type: "primary", size: "l" }} title="Next"></Button>
          </Center>
        </View>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
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
    borderRadius: 100,
    backgroundColor: "#000",
  },
  colorSelection1: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#b7b7b7",
  },
  colorSelection2: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#d4d4d4",
  },
  colorSelection3: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#e1e1e1",
  },
  colorSelection4: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "#aaa",
  },
});

export default CreateChallengeForm;
