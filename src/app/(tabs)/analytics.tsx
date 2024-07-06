import CorrectionsCard from "@src/components/analytics/CorrectionsCard";
import OverviewCard from "@src/components/analytics/OverviewCard";
import PostureScoresCard from "@src/components/analytics/PostureScoresCard";
import SessionHistoryCard from "@src/components/analytics/SessionHistoryCard";
import Page from "@src/components/layout/Page";
import FilterMenu from "@src/components/notifications/FilterMenu";
import Icon from "@src/components/ui/Icon";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { PostureData } from "@src/interfaces/posture.types";
import { getAnalytics } from "@src/services/analyticsApi";
import { theme } from "@src/styles/theme";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

const AnalyticsScreen = () => {
  const { data } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  const form = useForm<PostureData>();

  useEffect(() => {
    data && form.reset(data);
  }, [data]);

  return (
    <FormProvider {...form}>
      <Page
        header={
          <Stack gap={16}>
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
                {`Yesterday, ${dayjs(data?.start_date).format("MMM DD")}`}
              </Text>
              <Icon name="chevron-right" />
            </View>
          </Stack>
        }
      >
        <OverviewCard />

        <PostureScoresCard />

        <CorrectionsCard />

        <SessionHistoryCard />
      </Page>
    </FormProvider>
  );
};

{
  /* <SafeAreaView style={styles.container}>
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
              {`Today, ${dayjs(data?.start_date).format("MMM DD")}`}
            </Text>
            <Icon name="chevron-right" />
          </View>
        </View>

      
          <View style={styles.mainCard}>
           
          </View>

      </ScrollView>
    </SafeAreaView> */
}

const styles = StyleSheet.create({
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
});

export default AnalyticsScreen;
