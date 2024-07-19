import { useUser } from "@src/state/useUser";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import badges from "@src/badges";

const ProfileBadgeContainerPreview = () => {
  const userBadges = useUser((state) => state.user.badges);

  const latestBadges = userBadges
    ? userBadges
        .map((userBadge) => {
          const badge = badges.find((b) => b.id == userBadge.id);
          if (badge) {
            return { ...badge, date: userBadge.date };
          }
          return null;
        })
        .filter((badge) => badge?.date !== null)
        .sort((a, b) =>
          b?.date && a?.date
            ? new Date(b?.date).getTime() - new Date(a?.date).getTime()
            : 1,
        )
        .slice(0, 3)
    : [];

  const renderBadges = () => {
    return latestBadges?.map((badge, index) =>
      badge ? (
        <BadgeContainer
          key={index}
          id={badge.id}
          subtitle={badge.subtitle}
          description={badge.description}
          badge={badge.badge}
          color={badge.color}
          unlocked={true}
        />
      ) : null,
    );
  };

  const renderLockedBadges = () => {
    return badges
      .slice(0, 3)
      .map((badge, index) => (
        <BadgeContainer
          key={index}
          id={badge.id}
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
