import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Text } from "@src/components/ui/typography";
import ChallengeList from "@src/components/lists/ChallengeList";
import Stack from "@src/components/ui/Stack";
import Chip from "@src/components/ui/Chip";
import { usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPastChallenges } from "@src/services/challengeApi";
import { ChallengeStatusEnum } from "@src/interfaces/challenge.types";
import Icon from "@src/components/ui/Icon";
import { theme } from "@src/styles/theme";

const PastChallenges = () => {
  const navigation = useNavigation();
  const [filterStatus, setFilterStatus] = useState<
    ChallengeStatusEnum | undefined
  >();
  const [sortDesc, setSortDesc] = useState(-1);
  const path = usePathname();

  const { data } = useQuery({
    queryKey: ["pastChallenges", filterStatus, sortDesc],
    queryFn: () => getPastChallenges(filterStatus, sortDesc),
    enabled: path === "/challenges/past-challenges",
  });

  const handleSortDesc = () => {
    const sort = sortDesc == 1 ? -1 : 1;
    setSortDesc(sort);
  };

  return (
    <View style={styles.container}>
      <Stack flexDirection="row" p={16} alignItems="center">
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" />
          </View>
        </TouchableOpacity>
        <Text level="title_3" style={{ flex: 3 }}>
          {`Past Challenges`}
        </Text>
      </Stack>

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
          <Icon name="sort" />
        </Chip>
      </Stack>
      <ChallengeList challenges={data?.data ?? []} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: theme.colors.primary[200],
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PastChallenges;
