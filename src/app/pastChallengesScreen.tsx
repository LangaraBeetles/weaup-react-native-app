import { StyleSheet, View, Text, Image } from "react-native";

import ChallengeList from "@src/components/lists/ChallengeList";
import Stack from "@src/components/ui/Stack";
import Chip from "@src/components/ui/Chip";

//TODO START: Remove dummy data
const todayDate = new Date();

const member1 = {
  user_id: 1,
  joined_at: todayDate,
  points: 0,
  left_at: null,
};

const member2 = {
  user_id: 2,
  joined_at: todayDate,
  points: 0,
  left_at: null,
};

const challenge = {
  creator_id: 1,
  name: "Previous challenge",
  description: "Trial challenge",
  start_at: new Date("2024-06-01T07:00:00.000Z"),
  end_at: new Date("2024-06-02T07:00:00.000Z"),
  goal: 100,
  status: "completed",
  members: [member1, member2],
  progress: 50,
};
const challenges = Array(2).fill(challenge);
//TODO END

// TODO:
// - Add filter and sorting functionality
// - replace png files to svg

const PastChallengesScreen = () => {
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
          <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
            <Text>Completed</Text>
          </Chip>
          <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
            <Text>Quitted</Text>
          </Chip>
          <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
            <Text>Failed</Text>
          </Chip>
        </Stack>
        <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
          <Image source={require("../../assets/img/sortIcon.png")} />
        </Chip>
      </Stack>
      <ChallengeList challenges={challenges}></ChallengeList>
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
