import React, { useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Redirect } from "expo-router";

import Stack from "@src/components/ui/Stack";
import FloatingButton from "@src/components/ui/FloatingButton";
import CustomBottomSheetModal from "@src/components/ui/CustomBottomSheetModal";
import ChallengeList from "@src/components/lists/ChallengeList";
import Chip from "@src/components/ui/Chip";
import CreateChallengeContainer from "@src/components/container/CreateChallengeContainer";
import { useUser } from "@src/state/useUser";

//TODO START: Remove dummy data
const todayDate = new Date();
const duration = 2; //days

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
  name: "Challenging Work",
  description: "Weekly upkeep",
  start_at: new Date(),
  end_at: new Date(todayDate.setDate(todayDate.getDate() + duration)),
  goal: 100,
  status: "in_progress",
  members: [member1, member2],
  progress: 40,
};
const challenges = Array(8).fill(challenge);
//TODO END

const TogetherScreen = () => {
  const isGuest = useUser((data) => data.isGuest);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const addChallenge = () => bottomSheetModalRef.current?.present();
  const handleCloseModalPress = () => bottomSheetModalRef.current?.close();

  const createChallengeForm = (
    <CreateChallengeContainer handleCloseModalPress={handleCloseModalPress} />
  );

  if (isGuest) {
    return <Redirect href="/provider-signup" />;
  }

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
            <Text>All</Text>
          </Chip>
          <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
            <Text>Created by you</Text>
          </Chip>
        </Stack>
        <Chip borderRadius={50} p={12} h={45} colorScheme="primary">
          <Image source={require("../../../assets/img/sortIcon.png")} />
        </Chip>
      </Stack>
      <ChallengeList challenges={challenges} isOngoing={true} />
      <FloatingButton onPress={addChallenge} />
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        content={createChallengeForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default TogetherScreen;
