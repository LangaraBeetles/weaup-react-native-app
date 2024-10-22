import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import MembersList from "@src/components/lists/MembersList";
import { getChallengeById } from "@src/services/challengeApi";
import { globalStyles } from "@src/styles/globalStyles";
import { theme } from "@src/styles/theme";
import ChallengeDetailCard from "@src/components/listItems/ChallengeDetailCard";
import BackButton from "@src/components/ui/BackButton";
import isChallengeActive from "@src/utils/is-challenge-active";
import Skeleton from "@src/components/ui/Skeleton";
import Icon from "@src/components/ui/Icon";
import { useUser } from "@src/state/useUser";
import getShareChallengeLink from "@root/src/utils/share-challenge-link";

const ChallengeDetail = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const path = usePathname();
  const loggedUser = useUser((state) => state.user.id);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getChallengeById", path, id],
    queryFn: () => getChallengeById(id),
    enabled: path === "/challenges/challenge-details",
  });

  const members = data?.members.sort((a, b) =>
    a?.points > b?.points ? -1 : 1,
  );
  const color = data?.color ?? theme.colors.secondary[100];
  const { isOngoing } = isChallengeActive(data?.end_at ?? "");

  const handleShare = async () => {
    if (!data) {
      return;
    }
    try {
      const urlWithUserId = data?.url?.replace?.("[user_id]", loggedUser);

      const message =
        Platform.OS === "ios"
          ? getShareChallengeLink(data._id, loggedUser)
          : urlWithUserId;

      await Share.share({ message });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={styles.body}
      refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
    >
      <View style={[styles.container, { backgroundColor: color }]}>
        <Stack flexDirection="row" p={16} alignItems="center" gap={40}>
          <BackButton />

          <Text level="title_3" style={{ flex: 2 }}>
            {isOngoing ? `Challenge Progress` : `Challenge Summary`}
          </Text>
          {isOngoing && !!data?._id && (
            <Stack
              w={40}
              h={40}
              backgroundColor={theme.colors.white}
              alignItems="center"
              justifyContent="center"
              borderRadius={40}
            >
              <TouchableOpacity onPress={handleShare}>
                <Icon name="share-outline" size={24} />
              </TouchableOpacity>
            </Stack>
          )}
        </Stack>
        <View style={styles.background} />
        <View style={styles.innerContainer}>
          {isLoading ? (
            <Skeleton
              duration={900}
              style={{ height: 200 }}
              bg={theme.colors.neutral[50]}
            />
          ) : (
            <>
              <View style={styles.card}>
                <ChallengeDetailCard
                  data={data}
                  isOngoing={isOngoing}
                  color={color}
                />
              </View>
              <MembersList members={members} />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: globalStyles.colors.surface,
    height: "100%",
  },
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 50,
  },
  innerContainer: {
    padding: 16,
  },
  background: {
    backgroundColor: globalStyles.colors.surface,
    position: "absolute",
    top: 195,
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    backgroundColor: globalStyles.colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: globalStyles.colors.neutral[100],
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChallengeDetail;
