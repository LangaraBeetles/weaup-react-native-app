import { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Linking from "expo-linking";

import CustomBottomSheetModal from "@src/components/ui/CustomBottomSheetModal";
import Stack from "@src/components/ui/Stack";
import { theme } from "@src/styles/theme";
import Button from "@src/components/ui/Button";
import JoinChallengeContainer from "@src/components/container/JoinChallengeContainer";

const JoinChallenge = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [linkingData, setLinkingData] = useState<Linking.ParsedURL | null>(
    null,
  );

  const handleDeepLink = (event: Linking.EventType) => {
    const linking = Linking.parse(event.url);
    setLinkingData(linking);
  };

  const closeModal = () => {
    bottomSheetModalRef.current?.close();
    return true;
  };

  useEffect(() => {
    const linkingEvent = Linking.addEventListener("url", handleDeepLink);
    return () => {
      linkingEvent.remove();
    };
  }, []);

  useEffect(() => {
    if (linkingData) {
      bottomSheetModalRef.current?.present();
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        closeModal,
      );
      return () => backHandler.remove();
    }
  }, [linkingData]);

  return (
    <CustomBottomSheetModal
      ref={bottomSheetModalRef}
      content={
        <Stack
          backgroundColor={theme.colors.surface}
          alignItems="center"
          px={16}
          py={32}
          justifyContent="space-between"
          gap={20}
          h="100%"
        >
          <ScrollView>
            <JoinChallengeContainer
              challengeId={linkingData?.queryParams?.id as string}
              userId={linkingData?.queryParams?.user as string}
            />
          </ScrollView>
          <Button title="Go back to challenges" onPress={closeModal} />
        </Stack>
      }
    />
  );
};

export default JoinChallenge;
