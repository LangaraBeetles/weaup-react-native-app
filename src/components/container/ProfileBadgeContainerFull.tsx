import { StyleSheet } from "react-native";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import badges from "@src/badges";
import { useUser } from "@src/state/useUser";

const ProfileBadgeContainerFull = () => {
  const userBadges = useUser((state) => state.user.badges);

  const userBadgeIds = new Set(userBadges?.map((userBadge) => userBadge.id));

  const allBadges = badges.map((badge) => ({
    ...badge,
    unlocked: userBadgeIds.has(badge.id),
  }));

  const renderBadges = () => {
    return allBadges.map((badge, index) => (
      <BadgeContainer
        key={index}
        id={badge.id}
        title={badge.title}
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
      justifyContent="space-between"
      gap={16}
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
