import { Text } from "@src/components/ui/typography";

import { View } from "react-native";
import Card from "./Card";
import Stack from "../ui/Stack";
import { theme } from "@src/styles/theme";
import Icon from "../ui/Icon";

type SessionRowData = {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
  score: number;
  timeOfDay: string;
};
const data = [
  {
    id: "1",
    startTime: "19:30",
    endTime: "20:00",
    duration: "30 mins",
    score: 68,
    timeOfDay: "morning",
  },
  {
    id: "2",
    startTime: "19:30",
    endTime: "20:00",
    duration: "30 mins",
    score: 68,
    timeOfDay: "morning",
  },
  {
    id: "3",
    startTime: "19:30",
    endTime: "20:00",
    duration: "30 mins",
    score: 68,
    timeOfDay: "night",
  },
  {
    id: "4",
    startTime: "19:30",
    endTime: "20:00",
    duration: "30 mins",
    score: 68,
    timeOfDay: "night",
  },
];
const SessionHistoryCard = () => {
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
              <SessionRow key={values.id} data={values} />
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
          }}
        />

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
