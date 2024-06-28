import React, { useRef } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Stack from "@src/components/ui/Stack";
import FloatingButton from "@src/components/ui/FloatingButton";
import CustomBottomSheetModal from "@src/components/ui/CustomBottomSheetModal";
import ChallengeList from "@src/components/lists/ChallengeList";
import Chip from "@src/components/ui/Chip";
import CreateChallengeContainer from "@src/components/container/CreateChallengeContainer";
import { usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getChallenges } from "@src/services/challengeApi";
import { useUser } from "@src/state/useUser";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";

const TogetherScreen = () => {
  const isGuest = useUser((data) => data.isGuest);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const path = usePathname();

  const { data } = useQuery({
    queryKey: ["challenges"],
    queryFn: getChallenges,
    enabled: path === "/together",
  });

  const addChallenge = () => bottomSheetModalRef.current?.present();
  const handleCloseModalPress = () => bottomSheetModalRef.current?.close();

  const createChallengeForm = (
    <CreateChallengeContainer handleCloseModalPress={handleCloseModalPress} />
  );

  if (isGuest) {
    return <GoogleSignUp />;
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
      <ChallengeList challenges={data?.data ?? []} isOngoing={true} />
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
