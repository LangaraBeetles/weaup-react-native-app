import React, { useState } from "react";
import ChallengeList from "@src/components/lists/ChallengeList";
import Stack from "@src/components/ui/Stack";
import Chip from "@src/components/ui/Chip";
import { usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPastChallenges } from "@src/services/challengeApi";
import { ChallengeStatusEnum } from "@src/interfaces/challenge.types";
import Icon, { IconName } from "@src/components/ui/Icon";
import Page from "@src/components/layout/Page";
import { theme } from "@src/styles/theme";
import ListSkeleton from "@src/components/ui/ListSkeleton";
import { Text } from "@src/components/ui/typography";

const filters: Array<{
  label: string;
  value: `${ChallengeStatusEnum}`;
  icon: IconName;
}> = [
  {
    label: "Completed",
    value: "completed",
    icon: "award-outline",
  },
  {
    label: "Quitted",
    value: "quitted",
    icon: "face-sad",
  },
  {
    label: "Failed",
    value: "failed",
    icon: "cancel-outline",
  },
];

const emptyStateMessage = {
  in_progress: "No challenges found",
  completed: "No challenges found",
  quitted: "Woohoo! You haven't quitted any challenges yet! Keep going!",
  failed: "Woohoo! You haven't failed any challenges yet! Keep going!",
};

const PastChallengesScreen = () => {
  const [filterStatus, setFilterStatus] = useState<
    `${ChallengeStatusEnum}` | undefined
  >();

  const [sortDesc, setSortDesc] = useState(-1);
  const path = usePathname();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pastChallenges", filterStatus, sortDesc],
    queryFn: () => getPastChallenges(filterStatus, sortDesc),
    enabled: path === "/challenges/past",
  });

  const handleSortDesc = () => {
    const sort = sortDesc == 1 ? -1 : 1;
    setSortDesc(sort);
  };

  const updateFilter = (value: `${ChallengeStatusEnum}`) => {
    setFilterStatus((prev) => {
      if (prev === value) {
        return undefined;
      }

      return value;
    });
  };

  return (
    <Page
      backButtonShown
      title="Past Challenges"
      gradientProps={{
        colors: [theme.colors.primary[200], theme.colors.surface],
      }}
      header={
        <Stack flexDirection="row" gap={8} justifyContent="space-between">
          <Stack flexDirection="row" gap={8} justifyContent="flex-start">
            {filters.map((filter) => (
              <Chip
                colorScheme={
                  filter.value === filterStatus ? "selected" : "default"
                }
                leadingIcon={filter.icon}
                onPress={() => updateFilter(filter.value)}
              >
                {filter.label}
              </Chip>
            ))}
          </Stack>
          <Chip colorScheme="default" onPress={handleSortDesc} h={38} w={38}>
            <Icon
              name={sortDesc === 1 ? "sort-desc-filled" : "sort-asc-filled"}
              size={24}
            />
          </Chip>
        </Stack>
      }
    >
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <ChallengeList
          challenges={data ?? []}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <Stack justifyContent="center" alignItems="center" gap={12}>
              <Icon
                name="face-happy"
                color={theme.colors.random.green}
                size={24}
              />
              <Text
                align="center"
                style={{ color: theme.colors.neutral[300], width: 194 }}
              >
                {filterStatus
                  ? emptyStateMessage[filterStatus]
                  : emptyStateMessage.in_progress}
              </Text>
            </Stack>
          )}
        />
      )}
    </Page>
  );
};

export default PastChallengesScreen;
