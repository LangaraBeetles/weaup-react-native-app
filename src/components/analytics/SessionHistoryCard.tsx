import { View } from "react-native";

import { Text } from "@src/components/ui/typography";
import Center from "@src/components/ui/Center";
import Icon from "@src/components/ui/Icon";
import Stack from "@src/components/ui/Stack";
import Card from "./Card";

import { theme } from "@src/styles/theme";

import { useFormContext } from "react-hook-form";
import { PostureData } from "@src/interfaces/posture.types";

import dayjs from "dayjs";

type SessionRowData = {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
  score: number;
  timeOfDay: string;
};

// const data = [
//   {
//     id: "1",
//     startTime: "19:30",
//     endTime: "20:00",
//     duration: "30 mins",
//     score: 68,
//     timeOfDay: "morning",
//   },
//   {
//     id: "2",
//     startTime: "19:30",
//     endTime: "20:00",
//     duration: "30 mins",
//     score: 68,
//     timeOfDay: "morning",
//   },
//   {
//     id: "3",
//     startTime: "19:30",
//     endTime: "20:00",
//     duration: "30 mins",
//     score: 68,
//     timeOfDay: "night",
//   },
//   {
//     id: "4",
//     startTime: "19:30",
//     endTime: "20:00",
//     duration: "30 mins",
//     score: 68,
//     timeOfDay: "night",
//   },
// ];

const SessionHistoryCard = () => {
  const { watch } = useFormContext<PostureData>();

  const data = watch("sessions") ?? [];

  if (!data.length) {
    return null;
  }

  return (
    <Card gap={12} style={{ paddingBottom: 0 }}>
      <Text level="headline" weight="bold">
        Session History
      </Text>
      <View>
        {data.map((values, index) => {
          const isLastRow = index + 1 === data.length;
          return (
            <>
              <SessionRow
                key={values._id}
                data={{
                  id: values._id,
                  duration: values.duration,
                  startTime: dayjs(values.started_at).format("HH:mm"),
                  endTime: dayjs(values.ended_at).format("HH:mm"),
                  score: values?.score ?? 0,
                  timeOfDay:
                    dayjs(values.started_at).format("a") == "am"
                      ? "morning"
                      : "night",
                }}
              />
              <View
                style={{
                  ...(isLastRow
                    ? {}
                    : {
                        width: "100%",
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.neutral[100],
                      }),
                }}
              />
            </>
          );
        })}
      </View>
    </Card>
  );
};

const SessionRow: React.FC<{ data: SessionRowData }> = ({ data }) => {
  return (
    <Stack flexDirection="row" gap={12} justifyContent="space-between" py={18}>
      <Stack flexDirection="row" gap={12}>
        <Center
          bc={
            data.timeOfDay === "morning"
              ? theme.colors.primary[50]
              : theme.colors.secondary[100]
          }
          w={40}
          h={40}
          borderRadius={8}
          backgroundColor={
            data.timeOfDay === "morning"
              ? theme.colors.primary[50]
              : theme.colors.secondary[100]
          }
        >
          {data.timeOfDay === "morning" ? (
            <Icon name="day" color={theme.colors.primary[500]} size={24} />
          ) : (
            <Icon name="night" color={theme.colors.secondary[700]} size={24} />
          )}
        </Center>

        <Stack>
          <Text level="headline">{`${data.startTime} - ${data.endTime}`}</Text>
          <Text level="caption_1" style={{ color: theme.colors.neutral[600] }}>
            {data.duration}
          </Text>
        </Stack>
      </Stack>

      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={8}
        border={1}
        borderColor={theme.colors.neutral[100]}
        borderRadius={100}
        px={12}
        py={8}
      >
        <Icon name="star-fill" color={theme.colors.primary[500]} />
        <Text level="callout">{data.score}</Text>
      </Stack>
    </Stack>
  );
};

export default SessionHistoryCard;
