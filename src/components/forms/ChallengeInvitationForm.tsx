import React, { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, View, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import ShareButton from "@src/components/ui/ShareButton";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import { useFormContext } from "react-hook-form";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ChallengeInvitationForm = (props: {
  handleCloseModalPress: () => void;
}) => {
  const { handleCloseModalPress } = props;
  const { watch } = useFormContext<ChallengeInputType>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [hasShared, setHasShared] = useState(false);

  const url = watch("url");

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active" && hasShared) {
        bottomSheetModalRef.current?.close();
        handleCloseModalPress();
        setHasShared(false);
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [hasShared]);

  return (
    <View style={styles.main}>
      <Center p={16}>
        <Text level="title_2">Your challenge is set up!</Text>
      </Center>
      <Stack px={16} h="90%" alignItems="center" justifyContent="space-between">
        <Text align="center">
          Invite your teammates to New Challenge by sharing the code below
        </Text>
        <Stack justifyContent="flex-end" alignItems="center" gap={16}>
          <ShareButton url={url} setHasShared={setHasShared} />
          <Button
            variant="secondary"
            title="Not Now"
            onPress={handleCloseModalPress}
          />
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 40,
  },
});

export default ChallengeInvitationForm;
