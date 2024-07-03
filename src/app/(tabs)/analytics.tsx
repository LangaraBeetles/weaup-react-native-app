import OverviewCard from "@src/components/analytics/OverviewCard";
import PostureScoresCard from "@src/components/analytics/PostureScoresCard";
import FilterMenu from "@src/components/notifications/FilterMenu";
import Icon from "@src/components/ui/Icon";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

const AnalyticsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.header}>
          <Text level="title_1">Analytics</Text>

          <FilterMenu
            tabs={[
              { label: "Day", value: "day" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
            ]}
          />

          <View style={styles.dateHeader}>
            <Icon name="chevron-left" />
            <Text level="headline" style={{ marginTop: 4 }}>
              Yesterday, May 30
            </Text>
            <Icon name="chevron-right" />
          </View>
        </View>

        <View style={styles.mainCard}>
          {/* <View style={styles.card}>
            <View style={{ display: "flex", gap: 16 }}>
              <Text level="headline" weight="bold">
                Overview
              </Text>

              <OverviewSection label="Total Duration" content="15h 36m" />

              <OverviewSection label="Good Posture" content="65%" />

              <OverviewSection label="Bad Posture" content="35%" />
            </View>

            <View>

            </View>
          </View> */}

          <OverviewCard />

          <PostureScoresCard />

          {/* <View style={styles.card}>
            <View style={{ display: "flex", gap: 16 }}>
              <Text level="headline" weight="bold">
                Corrections
              </Text>

              <Spacer height={150} />
            </View>

            <View></View>
          </View>

          <View style={styles.card}>
            <View style={{ display: "flex", gap: 16 }}>
              <Text level="headline" weight="bold">
                Session History
              </Text>

              <Spacer height={150} />
            </View>

            <View></View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {},
  container: {
    paddingTop: 30,
    display: "flex",
    backgroundColor: theme.colors.primary[200],
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
  // card: {
  //   display: "flex",
  //   padding: 16,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   backgroundColor: "#FFF",
  //   borderRadius: 20,
  // },
});

export default AnalyticsScreen;
