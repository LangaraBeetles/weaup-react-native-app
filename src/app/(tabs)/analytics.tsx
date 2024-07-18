import CorrectionsCard from "@src/components/analytics/CorrectionsCard";
import TotalDurationCard from "@src/components/analytics/TotalDurationCard";
import OverviewCard from "@src/components/analytics/OverviewCard";
import PostureScoresCard from "@src/components/analytics/PostureScoresCard";
import SessionHistoryCard from "@src/components/analytics/SessionHistoryCard";
import Page from "@src/components/layout/Page";
import FilterMenu from "@src/components/notifications/FilterMenu";
import Icon from "@src/components/ui/Icon";
import Skeleton from "@src/components/ui/Skeleton";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { PostureData } from "@src/interfaces/posture.types";
import { getAnalytics } from "@src/services/analyticsApi";
import { theme } from "@src/styles/theme";
import formatCalendarDay from "@src/utils/format-calendar-day";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

dayjs.extend(calendar);

const AnalyticsScreen = () => {
  const [dayFilter, setDayFilter] = useState<string>(dayjs().format());

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["analytics", dayFilter],
    queryFn: () => getAnalytics(dayFilter),
    enabled: !!dayFilter && dayFilter != "",
  });

  const isToday = useMemo(
    () => dayjs(dayFilter).isSame(dayjs(), "date"),
    [dayFilter],
  );

  const form = useForm<PostureData>();

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, dayFilter]);

  return (
    <FormProvider {...form}>
      <Page
        title="Analytics"
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
              <TouchableOpacity
                onPress={() => {
                  setDayFilter((prev) =>
                    dayjs(prev).subtract(1, "day").format(),
                  );
                }}
              >
                <Icon name="chevron-left" />
              </TouchableOpacity>
              <Text level="headline" style={{ marginTop: 4 }}>
                {dayFilter && formatCalendarDay(dayFilter)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDayFilter((prev) => {
                    if (dayjs(prev).isSame(dayjs(), "date")) {
                      return prev;
                    }

                    return dayjs(prev).add(1, "day").format();
                  });
                }}
              >
                <Icon
                  name="chevron-right"
                  color={isToday ? "transparent" : undefined}
                />
              </TouchableOpacity>
            </View>
          </Stack>
        }
      >
        {isLoading || isRefetching ? (
          <Stack gap={20}>
            {new Array(4).fill({}).map((_, index) => (
              <Skeleton
                duration={900}
                delay={200 * index}
                style={{ height: 150 }}
                initialOpacity={1 - (index + 1) / 10}
              />
            ))}
          </Stack>
        ) : (
          <ScrollView
            style={{ height: "100%" }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refetch} />
            }
          >
            <Stack gap={20} pb={20}>
              <TotalDurationCard />
              <OverviewCard
                goodCount={data?.overview.good_posture_count ?? 0}
                badCount={data?.overview.bad_posture_count ?? 0}
              />

              <PostureScoresCard />

              <CorrectionsCard />

              <SessionHistoryCard />
            </Stack>
          </ScrollView>
        )}
      </Page>
    </FormProvider>
  );
};

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
