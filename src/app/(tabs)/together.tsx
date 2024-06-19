import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Stack from "@src/components/ui/Stack";
import Center from "@src/components/ui/Center";
import FloatingButton from "@src/components/ui/FloatingButton";
import ChallengeList from "@src/components/lists/ChallengeList";
import Button from "@src/components/ui/Button";
import CustomBottomSheetModal from "@src/components/ui/CustomBottomSheetModal";
import CreateChallengeForm from "@src/components/forms/CreateChallengeForm";

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
  description: "My first challenge",
  start_at: todayDate,
  end_at: new Date(todayDate.setDate(todayDate.getDate() + duration)),
  goal: 100,
  status: "in_progress",
  members: [member1, member2],
  progress: 40,
};
const challenges = Array(10).fill(challenge);
//TODO END

const TogetherScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const addChallenge = () => bottomSheetModalRef.current?.present();
  const handleCloseModalPress = () => bottomSheetModalRef.current?.close();

  const createChallengeForm = (
    <CreateChallengeForm handleCloseModalPress={handleCloseModalPress} />
  );

  return (
    <View style={styles.container}>
      <Center>
        <Stack flexDirection="row" gap={10} justifyContent="space-between">
          <Button
            type={{ type: "secondary", size: "s" }}
            title="By you"
          ></Button>
          <Button type={{ type: "secondary", size: "s" }} title="Sort"></Button>
        </Stack>
      </Center>
      <ChallengeList challenges={challenges}></ChallengeList>
      <FloatingButton onPress={addChallenge}></FloatingButton>
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        content={createChallengeForm}
      ></CustomBottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TogetherScreen;
