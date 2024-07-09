import { useUser } from "@src/state/useUser";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import badges from "@src/badges";

const ProfileBadgeContainerPreview = () => {
  const userBadges = useUser((state) => state.user.badges);
  console.log({ userBadges });

  // check which badges are unlocked by matching the id in the userBadges with the bages array

  const latestBadges = userBadges
    .map((userBadge) => {
      const badge = badges.find((b) => b.id === userBadge.id);
      if (badge) {
        return { ...badge, date: userBadge.date };
      }
      return null;
    })
    .filter((badge) => badge !== null)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 3);

  console.log({ latestBadges });

  const renderBadges = () => {
    return latestBadges.map((badge, index) => (
      <BadgeContainer
        key={index}
        id={badge.id}
        title={badge.title}
        subtitle={badge.subtitle}
        description={badge.description}
        badge={badge.badge}
        color={badge.color}
        unlocked={true}
      />
    ));
  };

  const renderLockedBadges = () => {
    return badges
      .slice(0, 3)
      .map((badge, index) => (
        <BadgeContainer
          key={index}
          id={badge.id}
          title={badge.title}
          subtitle={badge.subtitle}
          description={badge.description}
          badge={badge.badge}
          color={badge.color}
          unlocked={false}
        />
      ));
  };

  return (
    <Stack
      flexDirection="row"
      gap={16}
      justifyContent={latestBadges.length < 3 ? "start" : "space-between"}
    >
      {latestBadges.length > 0 ? renderBadges() : renderLockedBadges()}
    </Stack>
  );
};

export default ProfileBadgeContainerPreview;
