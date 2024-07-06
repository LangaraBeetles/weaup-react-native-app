import React, { useRef, useEffect, useState } from "react";
import { AppStateStatus, AppState, Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { usePathname, useRouter } from "expo-router";
import Stack from "@src/components/ui/Stack";
import FloatingButton from "@src/components/ui/FloatingButton";
import CustomBottomSheetModal from "@src/components/ui/CustomBottomSheetModal";
import ChallengeList from "@src/components/lists/ChallengeList";
import Chip from "@src/components/ui/Chip";
import CreateChallengeContainer from "@src/components/container/CreateChallengeContainer";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";
import { useQuery, focusManager } from "@tanstack/react-query";
import { getOngoingChallenges } from "@src/services/challengeApi";
import { useUser } from "@src/state/useUser";
import Page from "@src/components/layout/Page";
import Icon from "@src/components/ui/Icon";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";

const TogetherScreen = () => {
  const router = useRouter();
  const path = usePathname();

  const [filterUser, setFilterUser] = useState(false);
  const [sortDesc, setSortDesc] = useState(-1);
  const isGuest = useUser((data) => data.isGuest);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { data } = useQuery({
    queryKey: ["ongoingChallenges", filterUser, sortDesc, path],
    queryFn: () => getOngoingChallenges(filterUser, sortDesc),
    enabled: path === "/together",
    refetchOnWindowFocus: true,
    refetchInterval: 0,
  });

  const addChallenge = () => {
    bottomSheetModalRef.current?.present();
    focusManager.setFocused(undefined);
  };

  const handleCloseModalPress = () => {
    bottomSheetModalRef.current?.close();
    focusManager.setFocused(true);
  };

  const handleSortDesc = () => {
    const sort = sortDesc == 1 ? -1 : 1;
    setSortDesc(sort);
  };

  //refresh data when app is opened from background
  const onAppStateChange = (status: AppStateStatus) => {
    focusManager.setFocused(status === "active");
  };

  const viewPastChallenges = () => {
    router.navigate("challenges/past");
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  if (isGuest) {
    return <GoogleSignUp />;
  }

  return (
    <Page
      title="Challenges"
      gradientProps={{
        colors: [theme.colors.primary[300], theme.colors.surface],
      }}
      header={
        <Stack flexDirection="row" justifyContent="space-between">
          <Stack flexDirection="row" gap={10} justifyContent="flex-start">
            <Chip
              w={60}
              colorScheme={!filterUser ? "selected" : "default"}
              onPress={() => setFilterUser(false)}
            >
              All
            </Chip>
            <Chip
              onPress={() => setFilterUser(true)}
              colorScheme={filterUser ? "selected" : "default"}
            >
              Created by you
            </Chip>
          </Stack>
          <Chip colorScheme="default" onPress={handleSortDesc} h={38} w={38}>
            <Icon
              name={sortDesc === 1 ? "lightening-fill" : "copy-fill"}
              size={24}
            />
          </Chip>
        </Stack>
      }
    >
      <ChallengeList
        challenges={data ?? []}
        ListFooterComponent={() => {
          return (
            <Pressable onPress={viewPastChallenges}>
              <Stack
                gap={8}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                pb={16}
              >
                <Icon
                  name="history-outline"
                  color={theme.colors.neutral[300]}
                />
                <Text style={{ color: theme.colors.neutral[300] }}>
                  View past challenges
                </Text>
              </Stack>
            </Pressable>
          );
        }}
      />
      <FloatingButton onPress={addChallenge} />
      <CustomBottomSheetModal
        ref={bottomSheetModalRef}
        content={
          <CreateChallengeContainer
            handleCloseModalPress={handleCloseModalPress}
          />
        }
      />
    </Page>
  );
};

export default TogetherScreen;
