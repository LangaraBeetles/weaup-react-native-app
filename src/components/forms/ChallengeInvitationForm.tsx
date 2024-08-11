import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  AppStateStatus,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { Text } from "@src/components/ui/typography";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import { useFormContext } from "react-hook-form";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Share } from "react-native";
import { useUser } from "@root/src/state/useUser";
import getShareChallengeLink from "@root/src/utils/share-challenge-link";

const ChallengeInvitationForm = (props: {
  handleCloseModalPress: () => void;
}) => {
  const { handleCloseModalPress } = props;
  const { getValues } = useFormContext<ChallengeInputType>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [hasShared, setHasShared] = useState(false);
  const userId = useUser((state) => state.user.id);

  const name = getValues("name");

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

  const onShare = async () => {
    try {
      const data = getValues();
      if (!data?.id) {
        console.log("[SHARE CHALLENGE] - No challenge id found");
        return;
      }
      const urlWithUserId = data?.url.replace("[user_id]", userId);

      const message =
        Platform.OS === "ios"
          ? getShareChallengeLink(data?.id, userId)
          : urlWithUserId;

      await Share.share({
        message,
        url: urlWithUserId,
      });
      setHasShared(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
          Invite your teammates to {name} by sharing the code below
        </Text>
        <Stack justifyContent="flex-end" alignItems="center" gap={16}>
          <Button
            variant="primary"
            title="Share Invitation"
            onPress={onShare}
          />
          <Button
            variant="secondary"
            title={hasShared ? "Close" : "Not now"}
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
