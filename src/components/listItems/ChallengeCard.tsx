import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text } from "@src/components/ui/typography";
import ProgressBar from "@src/components/ui/ProgressBar";
import safenumber from "@src/utils/safenumber";
import { globalStyles } from "@src/styles/globalStyles";

const ChallengeCard = (props: any) => {
  const router = useRouter();
  const { challenge, isOngoing } = props;

  const showDetails = () => {
    router.push({
      pathname: "/challenges/challenge-details",
      params: { id: challenge._id, isOngoing: isOngoing },
    });
  };
  const end = new Date(challenge.end_at);
  const endMonth = end.toLocaleDateString("default", { month: "long" });
  const endDay = end.getDate();
  const goalPoints =
    safenumber(challenge.goal, 0) *
    safenumber(challenge.duration, 0) *
    safenumber(challenge.members.length, 1);
  const progress = challenge.members.reduce(
    (accu: any, curr: any) => accu + safenumber(curr.points),
    0,
  );

  const progressBarLabel = (
    <Text>
      {progress}/{goalPoints}
    </Text>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDetails}>
        <Text>{challenge.name}</Text>
        <Text>
          {isOngoing
            ? `${endDay - new Date().getDate()} days left`
            : `Ended on ${endMonth} ${endDay} `}
        </Text>
        <ProgressBar
          currentValue={progress}
          goal={challenge.goal}
          content={progressBarLabel}
          backgroundColor={globalStyles.colors.neutral[100]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 16,
    padding: 10,
  },
});

export default ChallengeCard;
