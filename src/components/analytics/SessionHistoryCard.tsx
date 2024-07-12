import { Text } from "@src/components/ui/typography";

import { View } from "react-native";
import Card from "./Card";
import Stack from "../ui/Stack";
import { theme } from "@src/styles/theme";
import { useFormContext } from "react-hook-form";
import { PostureData } from "@src/interfaces/posture.types";
import dayjs from "dayjs";
import ScoreChip from "../scoring/ScoreChip";
import Icon from "../ui/Icon";

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
        {/* TODO: implement image */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor:
              data.timeOfDay === "morning"
                ? theme.colors.primary[50]
                : theme.colors.secondary[100],
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={data.timeOfDay === "morning" ? "day" : "night"}
            size={24}
            color={
              data.timeOfDay === "morning"
                ? theme.colors.primary[500]
                : theme.colors.secondary[700]
            }
          />
        </View>

        <Stack>
          <Text level="headline">{`${data.startTime} - ${data.endTime}`}</Text>
          <Text level="caption_1" style={{ color: theme.colors.neutral[600] }}>
            {data.duration}
          </Text>
        </Stack>
      </Stack>

      <ScoreChip score={data.score} />
    </Stack>
  );
};

export default SessionHistoryCard;
