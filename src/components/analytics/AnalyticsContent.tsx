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
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RefreshControl, ScrollView } from "react-native";
import TotalDurationCard from "./TotalDurationCard";

const AnalyticsContent = ({ term }: { term: "day" | "week" | "month" }) => {
  const form = useForm<PostureData>();

  const { getDates } = useAnalyticsFilter();

  const currentFilter = getDates(term);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["analytics", currentFilter],
    queryFn: () => getAnalytics(currentFilter[0], currentFilter[1]),
    enabled:
      !!currentFilter && currentFilter[0] != "" && currentFilter[1] != "",
    staleTime: 30000,
    gcTime: 30000,
  });

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
    </FormProvider>
  );
};

export default AnalyticsContent;
