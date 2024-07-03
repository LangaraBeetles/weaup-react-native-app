import { ScrollView, StyleSheet, View } from "react-native";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text } from "@src/components/ui/typography";
import ProgressBar from "@src/components/ui/ProgressBar";
import Stack from "@src/components/ui/Stack";
import Icon from "@src/components/ui/Icon";
import Center from "@src/components/ui/Center";
import MembersList from "@src/components/lists/MembersList";
import { getChallengeById } from "@src/services/challengeApi";
import { globalStyles } from "@src/styles/globalStyles";

const challengeDetails = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const isOngoing: boolean = params.isOngoing as unknown as boolean;
  const path = usePathname();

  const { data } = useQuery({
    queryKey: ["getChallengeById"],
    queryFn: () => getChallengeById(id),
    enabled: path === "/challengeDetailsScreen",
    refetchOnWindowFocus: true,
    refetchInterval: 0,
  });

  const name = data?.data.name;
  const start = new Date(data?.data.start_at as string);
  const startMonth = start.toLocaleString("default", { month: "long" });
  const startDay = start.getDate();
  const end = new Date(data?.data.end_at as string);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();
  const members = data?.data.members;
  const goalPoints =
    data?.data.goal * data?.data.duration * data?.data.members.length ?? 1;
  const progress = 0;
  data?.data.members.reduce((accu: any, curr: any) => accu + curr.points, 0);
  const percentage = (progress / goalPoints) * 100;

  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <View style={styles.background} />
        <View style={styles.innerContainer}>
          <View style={styles.card}>
            <Stack justifyContent="center" gap={12}>
              {/* image and challenge details */}
              <Stack flexDirection="row" gap={12}>
                <Icon name="challenge-avatar" />
                <Stack gap={4}>
                  <Text level="title_3">{name}</Text>
                  {isOngoing && (
                    <Text
                      level="caption_1"
                      style={styles.captionDates}
                    >{`From ${startMonth} ${startDay} to ${endMonth} ${endDay}`}</Text>
                  )}
                  <Text level="caption_1" style={styles.captionDates}>
                    {isOngoing
                      ? `Ends in ${endDay - new Date().getDate()} days`
                      : `Ended on ${endMonth} ${endDay}`}
                  </Text>
                </Stack>
              </Stack>

              {/* progress bar */}
              <ProgressBar
                currentValue={progress}
                goal={goalPoints}
                backgroundColor={globalStyles.colors.neutral[100]}
                barColor={globalStyles.colors.secondary[400]}
              ></ProgressBar>

              {/* scores */}
              <Stack flexDirection="row" gap={10} justifyContent="space-around">
                <Stack flexDirection="column" alignItems="left">
                  <Text level="title_3">{progress}</Text>
                  <Text level="caption_1" style={styles.captionScores}>
                    Current points
                  </Text>
                </Stack>
                <Stack flexDirection="column" alignItems="left">
                  <Text level="title_3">{goalPoints}</Text>
                  <Text level="caption_1" style={styles.captionScores}>
                    Points to go
                  </Text>
                </Stack>
                <Stack flexDirection="column" alignItems="left">
                  <Text level="title_3">{percentage}%</Text>
                  <Text level="caption_1" style={styles.captionScores}>
                    Completed
                  </Text>
                </Stack>
              </Stack>

              <Center
                backgroundColor={globalStyles.colors.secondary[100]}
                borderRadius={24}
                py={8}
                px={20}
              >
                {isOngoing ? (
                  <Stack flexDirection="row" gap={8}>
                    <Icon
                      name="sparkle"
                      color={globalStyles.colors.secondary[700]}
                    />
                    <Text
                      level="footnote_2"
                      style={styles.footnote}
                      align="center"
                    >
                      You achieved {progress} points so far!
                    </Text>
                  </Stack>
                ) : (
                  <Stack flexDirection="row" gap={8}>
                    <Icon
                      name="award-outline"
                      color={globalStyles.colors.secondary[700]}
                    />
                    <Text level="footnote_2" style={styles.footnote}>
                      {data?.data.status}
                    </Text>
                  </Stack>
                )}
              </Center>
            </Stack>
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
    backgroundColor: globalStyles.colors.secondary[100],
    position: "relative",
    height: "100%",
  },
  innerContainer: {
    padding: 16,
  },
  background: {
    backgroundColor: globalStyles.colors.surface,
    position: "absolute",
    top: 46,
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
  captionDates: {
    color: globalStyles.colors.neutral[500],
  },
  captionScores: {
    color: globalStyles.colors.neutral[800],
  },
  footnote: {
    color: globalStyles.colors.secondary[700],
  },
});

export default challengeDetails;
