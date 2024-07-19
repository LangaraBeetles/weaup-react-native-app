import { View } from "react-native";
import Card from "./Card";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { PostureData, Record } from "@src/interfaces/posture.types";
import { useFormContext } from "react-hook-form";

const getXAxis = (term: string, data: Array<Record>) => {
  if (term === "month") {
    const days = data.map((value) => value.key.split("-").pop());

    return [days[0], days[7], days[14], days[21], days.pop()];
  }

  if (term === "week") {
    const days = data.map((value) => {
      const values = value.key.split("-");
      return `${values[1]}/${values[2]}`; // MM/DD
    });

    return days;
  }

  return ["00:00", "06:00", "12:00", "18:00", "23:00"];
};

const CorrectionsCard = () => {
  const { watch } = useFormContext<PostureData>();

  const term = watch("term");
  const records = watch("records_by_term") ?? [];
  const corrections =
    records?.map((data) => ({
      ...data,
      corrections: data.records.filter((record) => record.good_posture == false)
        ?.length,
    })) ?? [];

  const data = corrections?.map((data) => data.corrections ?? null) ?? [];
  //[0, 60, 50, null, 80, null, 20, 70, null, 50, 85, 68, null, null, 55]

  const xdata = getXAxis(term, records); // ["00:00", "06:00", "12:00", "18:00", "23:00"];
  const ydata = corrections.map((data) => data.corrections); //["25", "50", "75", "100"];

  const total = corrections?.reduce((accum, curr) => {
    return accum + curr.corrections;
  }, 0);

  return (
    <Card>
      <Stack justifyContent="space-between" flexDirection="row" gap={16}>
        <Text level="headline" weight="bold">
          Corrections
        </Text>

        <Stack flexDirection="row" alignItems="center" gap={8}>
          <Text level="caption_1" style={{ color: theme.colors.neutral[400] }}>
            Total
          </Text>
          <Text
            level="callout"
            weight="medium"
            style={{ color: theme.colors.neutral[600] }}
          >
            {total}
          </Text>
        </Stack>
      </Stack>

      <Stack flexDirection="row">
        <View style={{ height: 180, flex: 1 }}>
          <BarChart
            spacingInner={0.67}
            style={{ height: 160 }}
            data={data}
            contentInset={{ top: 20, bottom: 0 }}
            svg={{
              fill: theme.colors.primary[400],
            }}
            numberOfTicks={4}
          >
            <Grid
              svg={{
                strokeWidth: 1,
                strokeOpacity: 0.5,
                strokeDasharray: "2",
              }}
            />
          </BarChart>
          <Spacer height={8} />
          <XAxis
            style={{ paddingHorizontal: 0 }}
            data={xdata}
            formatLabel={(_, index) => xdata[index]!}
            contentInset={{ left: 16, right: 16 }}
            svg={{ fontSize: 10, fill: theme.colors.neutral[400] }}
          />
        </View>
        <Spacer width={8} />
        <YAxis
          style={{ paddingHorizontal: 0 }}
          data={ydata}
          contentInset={{ bottom: 30, top: 28 }}
          max={100}
          min={0}
          numberOfTicks={3}
          svg={{ fontSize: 10, fill: theme.colors.neutral[400] }}
        />
      </Stack>
    </Card>
  );
};

export default CorrectionsCard;
