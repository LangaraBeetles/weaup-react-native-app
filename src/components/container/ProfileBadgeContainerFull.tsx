import { Dimensions, StyleSheet } from "react-native";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import badges from "@src/badges";
import { useUser } from "@src/state/useUser";
import safenumber from "@root/src/utils/safenumber";

const windowWidth = Dimensions.get("window").width;
const gap = (windowWidth - 332) / 2;

const ProfileBadgeContainerFull = () => {
  const userBadges = useUser((state) => state.user.badges);

  const userBadgeIds = new Set(
    userBadges?.map((userBadge) => safenumber(userBadge.id, userBadge.id)),
  );

  const allBadges = badges.map((badge) => ({
    ...badge,
    unlocked: userBadgeIds.has(badge.id),
  }));

  const renderBadges = () => {
    return allBadges.map((badge, index) => (
      <BadgeContainer
        key={index}
        id={badge.id}
        subtitle={badge.subtitle}
        description={badge.description}
        badge={badge.badge}
        color={badge.color}
        unlocked={badge.unlocked}
      />
    ));
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="start"
      gap={gap}
      style={styles.container}
    >
      {renderBadges()}
    </Stack>
  );
};

export default ProfileBadgeContainerFull;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
  },
});
