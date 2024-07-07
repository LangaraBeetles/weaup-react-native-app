import { View } from "react-native";
import Card from "./Card";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { AreaChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import Spacer from "@src/components/ui/Spacer";
import Stack from "@src/components/ui/Stack";
import { PostureData } from "@src/interfaces/posture.types";
import { useFormContext } from "react-hook-form";
import safenumber from "@src/utils/safenumber";

const PostureScoresCard = () => {
  const { watch } = useFormContext<PostureData>();

  const data = watch("records_by_hour") ?? []; //[0, 60, 50, 80, 20, 70, 85, 68, 55];
  const xdata = ["00:00", "06:00", "12:00", "18:00", "23:00"];
  const ydata = ["25", "50", "75", "100"];

  const records = data.filter((record) => !!record.records.length);
  const avgScore =
    records?.reduce((accm, curr) => accm + (curr.score ?? 0), 0) /
    (records.length ?? 1);

  return (
    <Card>
      <Stack justifyContent="space-between" flexDirection="row" gap={16}>
        <Text level="headline" weight="bold">
          Posture Scores
        </Text>

        <Stack flexDirection="row" alignItems="center" gap={8}>
          <Text level="caption_1" style={{ color: theme.colors.neutral[400] }}>
            Final
          </Text>
          <Text
            level="callout"
            weight="medium"
            style={{ color: theme.colors.neutral[600] }}
          >
            {safenumber(avgScore)?.toFixed(0)}
          </Text>
        </Stack>
      </Stack>

      <Stack flexDirection="row">
        <View style={{ height: 180, flex: 1 }}>
          <AreaChart
            style={{ height: 160 }}
            data={data}
            yAccessor={({ item }) => item.score ?? 0}
            contentInset={{ top: 25, bottom: 10 }}
            curve={shape.curveBasis}
            svg={{
              fill: "url(#area-gradient)",
            }}
            yMax={100}
            yMin={0}
            numberOfTicks={4}
          >
            <GraphLine />
            <LineGradient />
            <Gradient />
            <Grid
              svg={{
                strokeWidth: 1,
                strokeOpacity: 0.5,
                strokeDasharray: "2",
              }}
            />
          </AreaChart>
          <Spacer height={8} />
          <XAxis
            style={{ paddingHorizontal: 0 }}
            data={xdata}
            formatLabel={(_, index) => xdata[index]}
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

const Gradient = ({ index }: any) => (
  <Defs key={index}>
    <LinearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <Stop
        offset="0%"
        stopColor={theme.colors.secondary[500]}
        stopOpacity={0.6}
      />
      <Stop
        offset="20%"
        stopColor={theme.colors.secondary[500]}
        stopOpacity={0.3}
      />

      <Stop
        offset="50%"
        stopColor={theme.colors.primary[200]}
        stopOpacity={0.5}
      />

      <Stop
        offset="90%"
        stopColor={theme.colors.primary[200]}
        stopOpacity={0.1}
      />

      <Stop offset="100%" stopColor={theme.colors.white} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);

const LineGradient = ({ index }: any) => (
  <Defs key={index}>
    <LinearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <Stop
        offset="0%"
        stopColor={theme.colors.secondary[600]}
        stopOpacity={1}
      />
      <Stop
        offset="30%"
        stopColor={theme.colors.secondary[500]}
        stopOpacity={1}
      />

      <Stop
        offset="50%"
        stopColor={theme.colors.primary[400]}
        stopOpacity={1}
      />

      <Stop
        offset="90%"
        stopColor={theme.colors.primary[500]}
        stopOpacity={1}
      />

      <Stop offset="100%" stopColor={theme.colors.white} stopOpacity={1} />
    </LinearGradient>
  </Defs>
);

const GraphLine = ({ line }: any) => (
  <Path
    y={-1}
    key={"line"}
    d={line}
    stroke={"url(#line-gradient)"}
    strokeOpacity={0.5}
    strokeWidth={2}
    fill={"none"}
  />
);

export default PostureScoresCard;
