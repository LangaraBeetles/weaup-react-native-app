import { Text } from "@src/components/ui/typography";
import { Dimensions, StyleSheet, View } from "react-native";
import Spacer from "@src/components/ui/Spacer";
import Card from "./Card";
import { ProgressChart } from "react-native-chart-kit";

const OverviewCard = () => {
  const data = {
    labels: ["Swim"], // optional
    data: [0.4],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 60,

    // useShadowColorFromDataset: false, // optional
  };

  return (
    <Card flexDirection="row">
      <View style={{ display: "flex", gap: 16 }}>
        <Text level="headline" weight="bold">
          Overview
        </Text>

        <OverviewSection label="Total Duration" content="15h 36m" />

        <OverviewSection label="Good Posture" content="65%" />

        <OverviewSection label="Bad Posture" content="35%" />
      </View>
      <View>
        <ProgressChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          strokeWidth={16}
          radius={60}
          chartConfig={{ ...chartConfig }}
          hideLegend={false}
        />
      </View>
    </Card>
  );
};

const OverviewSection: React.FC<{ label: string; content: string }> = ({
  label,
  content,
}) => {
  return (
    <View>
      <Text level="caption_3" weight="bold">
        {label}
      </Text>
      <Text level="title_3" weight="bold">
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {},
  container: {
    paddingTop: 30,
    display: "flex",
    backgroundColor: "#FDD462",
  },
  header: {
    display: "flex",
    gap: 16,
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  dateHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F9F9F9",
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: "100%",
    gap: 20,
  },
  card: {
    display: "flex",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 20,
  },
});

export default OverviewCard;
