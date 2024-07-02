import { Dimensions, View } from "react-native";
import Card from "./Card";
import { Text } from "@src/components/ui/typography";
import { LineChart } from "react-native-chart-kit";
import { theme } from "@src/styles/theme";

const PostureScoresCard = () => {
  return (
    <Card>
      <View style={{ display: "flex", gap: 16 }}>
        <Text level="headline" weight="bold">
          Posture Scores
        </Text>
      </View>

      <View style={{ position: "relative", height: 230 }}>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width - 65} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            // backgroundColor: " rgba(255, 241, 204, 0.50)",
            backgroundGradientFrom: `rgba(127, 205, 198, 0.50), rgba(255, 241, 204, 0.50)`,
            backgroundGradientTo:
              "rgba(127, 205, 198, 0.50), rgba(255, 241, 204, 0.50)",
            // fillShadowGradient:
            //   "rgba(127, 205, 198, 0.50), rgba(255, 241, 204, 0.50)",
            fillShadowGradientToOffset: 50,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "1",
              stroke: theme.colors.secondary[600],
              fill: theme.colors.secondary[600],
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Card>
  );
};

export default PostureScoresCard;
