import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import ChallengeList from "@src/components/lists/ChallengeList";
import Stack from "@src/components/ui/Stack";
import Chip from "@src/components/ui/Chip";
import { usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPastChallenges } from "@src/services/challengeApi";
import { ChallengeStatusEnum } from "@src/interfaces/challenge.types";

const PastChallengesScreen = () => {
  const [filterStatus, setFilterStatus] = useState<
    ChallengeStatusEnum | undefined
  >();
  const [sortDesc, setSortDesc] = useState(-1);
  const path = usePathname();

  const { data, refetch } = useQuery({
    queryKey: ["pastChallenges"],
    queryFn: () => getPastChallenges(filterStatus, sortDesc),
    enabled: path === "/pastChallengesScreen",
    refetchOnWindowFocus: true,
    refetchInterval: 0,
  });

  const handleSortDesc = () => {
    const sort = sortDesc == 1 ? -1 : 1;
    setSortDesc(sort);
  };

  useEffect(() => {
    refetch();
  }, [filterStatus, sortDesc]);

  return (
    <View style={styles.container}>
      <Stack
        flexDirection="row"
        gap={10}
        pb={16}
        px={16}
        justifyContent="space-between"
      >
        <Stack flexDirection="row" gap={10} justifyContent="flex-start">
          <Chip
            borderRadius={50}
            p={12}
            h={45}
            colorScheme="primary"
            onPress={() => setFilterStatus(undefined)}
          >
            <Text>All</Text>
          </Chip>
          <Chip
            borderRadius={50}
            p={12}
            h={45}
            colorScheme="primary"
            onPress={() => setFilterStatus(ChallengeStatusEnum.COMPLETED)}
          >
            <Text>Completed</Text>
          </Chip>
          <Chip
            borderRadius={50}
            p={12}
            h={45}
            colorScheme="primary"
            onPress={() => setFilterStatus(ChallengeStatusEnum.QUITTED)}
          >
            <Text>Quitted</Text>
          </Chip>
          <Chip
            borderRadius={50}
            p={12}
            h={45}
            colorScheme="primary"
            onPress={() => setFilterStatus(ChallengeStatusEnum.FAILED)}
          >
            <Text>Failed</Text>
          </Chip>
        </Stack>
        <Chip
          borderRadius={50}
          p={12}
          h={45}
          colorScheme="primary"
          onPress={handleSortDesc}
        >
          <Image source={require("../../assets/img/sortIcon.png")} />
        </Chip>
      </Stack>
      <ChallengeList challenges={data?.data ?? []}></ChallengeList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
});

export default PastChallengesScreen;
