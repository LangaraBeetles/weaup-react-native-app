import { useEffect, useState } from "react";
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
import { Controller, useFormContext } from "react-hook-form";
import { ChallengeInputType } from "@src/interfaces/challenge.types";

const ChallengeDetailsForm = (props: any) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { handleCloseModalPress, handleStep } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<ChallengeInputType>();
  const [watchDuration, watchStart] = watch(["duration", "start_at"]);

  useEffect(() => {
    if (watchDuration) {
      const startDate = getValues("start_at");
      if (startDate == undefined) {
        setValue("start_at", new Date().toDateString());
      }
      const tempDate = new Date(startDate);
      tempDate.setDate(tempDate.getDate() + Number(watchDuration));
      setValue("end_at", tempDate.toDateString());
    }
  }, [watchDuration, watchStart]);

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
          <Controller
            control={control}
            name={"name"}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextInput
                placeholder="Type Challenge Name"
                {...field}
                onChangeText={field.onChange}
              />
            )}
          />
          {/* TODO: change based on design flow */}

          {errors.name && <Text>This is required.</Text>}

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
          <Controller
            control={control}
            name="description"
            rules={{
              required: false,
            }}
            render={({ field }) => {
              return (
                <TextInput
                  placeholder="Description (optional)"
                  {...field}
                  onChangeText={field.onChange}
                />
              );
            }}
          />
          <Stack flexDirection="row" justifyContent="space-between">
            <Text level="callout">Start date</Text>
            <Controller
              control={control}
              defaultValue={undefined}
              name="start_at"
              rules={{
                required: false,
              }}
              render={({ field }) => {
                return (
                  <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                    <Text level="body"> {field.value ?? "Select Date"}</Text>
                    <DatePickerModal
                      mode={"date"}
                      date={field.value ? new Date(field.value) : new Date()}
                      open={openDatePicker}
                      setOpen={setOpenDatePicker}
                      onChangeText={(e: Date) =>
                        field.onChange(e.toDateString())
                      }
                    ></DatePickerModal>
                  </TouchableOpacity>
                );
              }}
            />
          </Stack>
          <Stack flexDirection="row" justifyContent="space-between">
            <Text level="callout">Duration</Text>
            <Stack>
              <Controller
                control={control}
                defaultValue={undefined}
                name="duration"
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return (
                    <TextInput
                      inputMode="numeric"
                      keyboardType="numeric"
                      placeholder="Select challenge span"
                      {...field}
                      onChangeText={field.onChange}
                    />
                  );
                }}
              />
              {/* TODO: change based on design flow */}
              {errors.duration && <Text>This is required.</Text>}
            </Stack>
            {/* TODO: create bottomsheet for duration */}
          </Stack>
        </Stack>
        <Button
          type={{ type: "primary", size: "l" }}
          title="Next"
          onPress={handleSubmit(() => {
            handleStep(1);
          })}
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
