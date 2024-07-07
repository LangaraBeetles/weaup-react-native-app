import { ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import MembersList from "@src/components/lists/MembersList";
import { getChallengeById } from "@src/services/challengeApi";
import { globalStyles } from "@src/styles/globalStyles";
import { theme } from "@src/styles/theme";
import ChallengeDetailCard from "@src/components/listItems/ChallengeDetailCard";
import BackButton from "@src/components/ui/BackButton";

const ChallengeDetail = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const isOngoing: boolean = params.isOngoing as unknown as boolean;
  const path = usePathname();

  const { data } = useQuery({
    queryKey: ["getChallengeById", path, id],
    queryFn: () => getChallengeById(id),
    enabled: path === "/challenges/challenge-details",
  });

  const members = data?.data.members;
  const color = data?.data.color ?? theme.colors.secondary[100];
  return (
    <ScrollView style={styles.body}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <Stack flexDirection="row" p={16} alignItems="center" gap={40}>
          <BackButton />

          <Text level="title_2">
            {isOngoing ? `Challenge Progress` : `Challenge Summary`}
          </Text>
        </Stack>
        <View style={styles.background} />
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <ChallengeDetailCard
              data={data?.data}
              isOngoing={isOngoing}
              color={color}
            />
          </View>
          <MembersList members={members} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: globalStyles.colors.surface,
    height: "100%",
  },
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 50,
  },
  innerContainer: {
    padding: 16,
  },
  background: {
    backgroundColor: globalStyles.colors.surface,
    position: "absolute",
    top: 195,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: globalStyles.colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: globalStyles.colors.neutral[100],
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

export default ChallengeDetail;
