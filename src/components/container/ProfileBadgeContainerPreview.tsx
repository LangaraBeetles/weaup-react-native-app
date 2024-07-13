import { useUser } from "@src/state/useUser";
import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import badges from "@src/badges";
import { BadgeType, UserBadgeType } from "@src/interfaces/badges.types";
import { View } from "react-native";

const getLatestBadges = (userBadges: Array<UserBadgeType>) => {
  try {
    return userBadges?.length
      ? userBadges
          ?.map((userBadge) => {
            const badge = badges.find((b) => b.id === userBadge.id);
            if (badge) {
              return { ...badge, date: userBadge.date };
            }
            return null;
          })
          ?.filter((badge) => !!badge)
          ?.filter((badge) => !!badge?.date)
          ?.sort(
            (a, b) =>
              new Date(b?.date as string).getTime() -
              new Date(a?.date as string).getTime()
          )
          ?.slice(0, 3)
      : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const ProfileBadgeContainerPreview = () => {
  const userBadges = useUser((state) => state.user.badges);

  const latestBadges: Array<BadgeType> = getLatestBadges(userBadges);

  const renderBadges = () => {
    return latestBadges?.map((badge, index) =>
      badge ? (
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
      ) : null
    );
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
      justifyContent={latestBadges.length < 3 ? "flex-start" : "space-between"}
    >
      {latestBadges.length
        ? latestBadges?.map((badge, index) => {
            return (
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
              // <View />
            );
          })
        : badges?.slice(0, 3)?.map((badge, index) => (
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
            // <View />
          ))}
    </Stack>
  );
};

export default ProfileBadgeContainerPreview;
