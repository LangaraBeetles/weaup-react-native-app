import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import DatePickerModal from "@src/components/ui/DatePickerModal";

const ChallengeDetailsForm = (props: any) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const { challenge, handleChallenge, handleCloseModalPress, handleStep } =
    props;

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
    handleChallenge("start_at", newDate.toDateString());
  };

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
        <Text style={styles.content} level="title_2">
          Create Challenge
        </Text>
      </Stack>

      <Stack
        px={16}
        h={"100%"}
        justifyContent="space-around"
        alignItems="center"
      >
        <Stack gap={8} alignItems="center">
          <TextInput
            placeholder="Type Challenge Name"
            value={challenge.name}
            onChangeText={(e) => handleChallenge("name", e)}
          ></TextInput>
          <Stack flexDirection="row" gap={18} pt={22} justifyContent="center">
            <TouchableOpacity style={styles.colorSelection1} />
            <TouchableOpacity style={styles.colorSelection2} />
            <TouchableOpacity style={styles.colorSelection3} />
            <TouchableOpacity style={styles.colorSelection4} />
          </Stack>
        </Stack>

        <Stack
          gap={16}
          p={16}
          borderRadius={16}
          backgroundColor="#DFDFDF"
          w={"100%"}
        >
          <TextInput
            placeholder="Description (optional)"
            value={challenge.description}
            onChangeText={(e) => handleChallenge("description", e)}
          ></TextInput>
          <Stack flexDirection="row" justifyContent="space-between">
            <Text level="callout">Start date</Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <Text level="body"> {challenge.start_at ?? "Select Date"} </Text>
              <DatePickerModal
                mode={"date"}
                date={date}
                setDate={onDateChange}
                open={openDatePicker}
                setOpen={setOpenDatePicker}
              ></DatePickerModal>
            </TouchableOpacity>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Text level="callout">Duration</Text>
            <TextInput
              placeholder="Select challenge span"
              value={challenge.duration}
              onChangeText={(e) => handleChallenge("duration", e)}
            ></TextInput>
            {/* TODO: create bottomsheet for duration */}
          </Stack>
        </Stack>
        <Button
          type={{ type: "primary", size: "l" }}
          title="Next"
          onPress={() => handleStep(1)}
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

export default ChallengeDetailsForm;
