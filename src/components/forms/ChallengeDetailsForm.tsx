import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Pressable,
} from "react-native";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import DatePickerModal from "@src/components/ui/DatePickerModal";
import { Controller, useFormContext } from "react-hook-form";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import CloseButton from "../ui/CloseButton";
import ChallengeAvatarCarousel from "../challenges/ChallengeAvatarCarousel";
import { theme } from "@src/styles/theme";
import Icon, { IconName } from "../ui/Icon";
import Divider from "../ui/Divider";

const colors = [
  theme.colors.error[100],
  theme.colors.primary[100],
  theme.colors.secondary[100],
  theme.colors.random.blue,
];

const ChallengeDetailsForm = ({
  onClose: onHandleClose,
}: {
  onClose: () => void;
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
    getValues,
  } = useFormContext<ChallengeInputType>();

  const [watchDuration, watchStart] = watch(["duration", "start_at"]);

  const onClose = () => {
    if (isDirty) {
      Alert.alert("Hold on!", "Are you sure you want to cancel?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: onHandleClose },
      ]);

      return;
    }

    onHandleClose();
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.main}>
        <Stack flexDirection="row" gap={42} p={16} alignItems="center">
          <Stack w={40} h={40} />

          <Text style={styles.content} level="title_2">
            Create Challenge
          </Text>

          <CloseButton onClose={onClose} />
        </Stack>

        <Stack
          flexDirection="column"
          px={16}
          flexGrow={1}
          gap={40}
          alignItems="center"
        >
          <Stack
            w="100%"
            flexGrow={1}
            gap={12}
            justifyContent="center"
            alignItems="center"
          >
            <Stack alignItems="center" gap={34}>
              <ChallengeAvatarCarousel
                height={80}
                onChange={(icon) => {
                  setValue("icon", icon);
                }}
              />

              <Controller
                control={control}
                name="name"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Stack gap={2} flexDirection="row">
                    <TextInput
                      placeholder="Type Challenge Name"
                      {...field}
                      placeholderTextColor={theme.colors.neutral[400]}
                      style={{
                        fontSize: 22,
                        fontStyle: "normal",
                        fontFamily: "NunitoBold",
                        color: theme.colors.text,
                      }}
                      onChangeText={field.onChange}
                    />
                    {errors.name && (
                      <Text
                        align="center"
                        style={{ color: theme.colors.error[500] }}
                      >
                        *
                      </Text>
                    )}
                  </Stack>
                )}
              />

              <Controller
                control={control}
                name="color"
                render={({ field }) => {
                  return (
                    <Stack flexDirection="row" gap={8} justifyContent="center">
                      {colors.map((color) => {
                        return (
                          <Pressable
                            onPress={() => {
                              field.onChange(color);
                            }}
                          >
                            <Stack
                              borderColor={
                                field.value == color
                                  ? theme.colors.neutral[500]
                                  : theme.colors.white
                              }
                              border={2.5}
                              borderRadius={32}
                              h={32}
                              w={32}
                              backgroundColor={color}
                            />
                          </Pressable>
                        );
                      })}
                    </Stack>
                  );
                }}
              />
            </Stack>

            <Stack
              gap={20}
              p={20}
              borderRadius={16}
              border={1}
              borderColor={theme.colors.neutral[100]}
              backgroundColor={theme.colors.white}
              w="100%"
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
                      placeholderTextColor={theme.colors.neutral[400]}
                      style={{
                        fontSize: 16,
                        fontStyle: "normal",
                        fontFamily: "NunitoMedium",
                        color: theme.colors.text,
                      }}
                      onChangeText={field.onChange}
                    />
                  );
                }}
              />
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between">
                <Label icon="calendar-outline" text="Start date" />
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
                        {!!field.value ? (
                          <Text level="body">{field.value}</Text>
                        ) : (
                          <Text
                            level="body"
                            style={{ color: theme.colors.neutral[300] }}
                          >
                            Select date
                          </Text>
                        )}

                        <DatePickerModal
                          mode={"date"}
                          date={
                            field.value ? new Date(field.value) : new Date()
                          }
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
              <Divider />

              <Stack flexDirection="row" justifyContent="space-between">
                <Label icon="clock-outline" text="Duration (days)" />
                <Stack flexDirection="row">
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
                          placeholderTextColor={theme.colors.neutral[300]}
                          style={{
                            fontSize: 16,
                            fontStyle: "normal",
                            fontFamily: "NunitoMedium",
                          }}
                          onChangeText={field.onChange}
                        />
                      );
                    }}
                  />
                  {/* TODO: change based on design flow */}
                  {errors.duration && (
                    <Text
                      align="center"
                      style={{ color: theme.colors.error[500] }}
                    >
                      *
                    </Text>
                  )}
                </Stack>
                {/* TODO: create bottomsheet for duration */}
              </Stack>
            </Stack>
          </Stack>
          <Stack flexGrow={0} justifyContent="flex-end">
            <Button
              variant="primary"
              title="Next"
              onPress={handleSubmit(() => {
                setValue("step", "goal");
              })}
            />
          </Stack>
        </Stack>
      </View>
    </TouchableWithoutFeedback>
  );
};

const Label = ({ icon, text }: { icon: IconName; text: string }) => {
  return (
    <Stack flexDirection="row" gap={4} alignItems="center">
      <Icon name={icon} color={theme.colors.neutral[400]} size={20} />
      <Text level="callout" style={{ color: theme.colors.neutral[400] }}>
        {text}
      </Text>
    </Stack>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 40,
  },
  content: {
    flexGrow: 2,
  },
});

export default ChallengeDetailsForm;
