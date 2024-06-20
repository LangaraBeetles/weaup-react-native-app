import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ProgressBar from "@src/components/ui/ProgressBar";
import Stack from "@src/components/ui/Stack";

const challengeDetails = () => {
  const params = useLocalSearchParams();

  //TODO: get the challengeId only, then make a GET request from the challenge API
  const name = params.name;
  const goal: number = params.goal as unknown as number;
  const progress: number = params.progress as unknown as number;
  const isOngoing: boolean = params.isOngoing as unknown as boolean;
  const start = new Date(params.startDate as string);
  const startMonth = start.toLocaleString("default", { month: "long" });
  const startDay = start.getDate();
  const end = new Date(params.endDate as string);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      {isOngoing && (
        <Text>{`From ${startMonth} ${startDay} to ${endMonth} ${endDay}`}</Text>
      )}
      <Text>
        {isOngoing
          ? `Ends in ${endDay - new Date().getDate()} days`
          : `Ended on ${endMonth} ${endDay}`}
      </Text>
      <ProgressBar currentValue={40} goal={100}></ProgressBar>
      <Stack flexDirection="row" gap={10} justifyContent="space-between">
        <Stack flexDirection="column" alignItems="center">
          <Text>{progress}</Text>
          <Text>Current points</Text>
        </Stack>
        <Stack flexDirection="column" alignItems="center">
          <Text>{goal - progress}</Text>
          <Text>Points to go</Text>
        </Stack>
        <Stack flexDirection="column" alignItems="center">
          <Text>{(progress / goal) * 100}%</Text>
          <Text>Completed</Text>
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    marginHorizontal: 16,
    padding: 16,
  },
});

export default challengeDetails;
