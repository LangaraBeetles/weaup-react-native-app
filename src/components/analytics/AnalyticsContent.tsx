import CorrectionsCard from "@src/components/analytics/CorrectionsCard";
import OverviewCard from "@src/components/analytics/OverviewCard";
import PostureScoresCard from "@src/components/analytics/PostureScoresCard";
import SessionHistoryCard from "@src/components/analytics/SessionHistoryCard";
import Skeleton from "@src/components/ui/Skeleton";
import Stack from "@src/components/ui/Stack";
import { PostureData } from "@src/interfaces/posture.types";
import { getAnalytics } from "@src/services/analyticsApi";
import { useAnalyticsFilter } from "@src/state/useAnalyticsFilters";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RefreshControl, ScrollView } from "react-native";
import TotalDurationCard from "./TotalDurationCard";
import { getActiveMonitoring } from "@root/src/services/activeMonitoringApi";
import { getAllSessions } from "@root/src/services/sessionApi";
import safenumber from "@root/src/utils/safenumber";

const AnalyticsContent = ({ term }: { term: "day" | "week" | "month" }) => {
  const form = useForm<PostureData>();

  const { getDates } = useAnalyticsFilter();

  const currentFilter = getDates(term);

  const {
    data,
    isLoading: isAnalyticsLoading,
    refetch: refetchAnalytics,
    isRefetching: isAnalyticsRefetching,
  } = useQuery({
    queryKey: ["analytics", currentFilter],
    queryFn: () => getAnalytics(currentFilter[0], currentFilter[1]),
    enabled:
      !!currentFilter && currentFilter[0] != "" && currentFilter[1] != "",
    staleTime: 30000,
    gcTime: 30000,
  });

  const {
    data: records,
    isLoading: isRecordsLoading,
    refetch: refetchRecords,
    isRefetching: isRecordsRefetching,
  } = useQuery({
    queryKey: ["monitoring-duration", currentFilter],
    queryFn: () => getActiveMonitoring(currentFilter[0], currentFilter[1]),
    enabled:
      !!currentFilter && currentFilter[0] != "" && currentFilter[1] != "",
    staleTime: 30000,
    gcTime: 30000,
  });

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    refetch: refetchSessions,
    isRefetching: isSessionsRefetching,
  } = useQuery({
    queryKey: ["sessions", currentFilter],
    queryFn: () => getAllSessions(currentFilter[0], currentFilter[1]),
    enabled:
      !!currentFilter && currentFilter[0] != "" && currentFilter[1] != "",
    staleTime: 30000,
    gcTime: 30000,
  });

  const isLoading = isAnalyticsLoading || isRecordsLoading || isSessionsLoading;
  const isRefetching =
    isAnalyticsRefetching || isRecordsRefetching || isSessionsRefetching;

  const totalDuration = useMemo(() => {
    const activeTotal = records?.reduce?.(
      (acc: number, record: { duration: number }) => {
        return acc + safenumber(record.duration);
      },
      0,
    );

    const postureTotal = sessions?.reduce?.((acc: number, session) => {
      return acc + safenumber(session.duration);
    }, 0);

    return safenumber(activeTotal + postureTotal);
  }, [sessions?.length, records?.length, currentFilter, isRefetching]);

  const refetch = async () => {
    await refetchAnalytics();
    await refetchRecords();
    await refetchSessions();
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, currentFilter]);

  return (
    <FormProvider {...form}>
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
            <TotalDurationCard totalDuration={totalDuration} />

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
    </FormProvider>
  );
};

export default AnalyticsContent;
