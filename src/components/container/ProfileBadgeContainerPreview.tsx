import Stack from "../ui/Stack";
import BadgeContainer from "./BadgeContainer";
import { BadgeType } from "@src/interfaces/badges.types";

// TODO: get the badges from the user
const badgeData: BadgeType[] = [
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2023-08-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: true,
    date: "2024-04-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: "2023-04-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: null,
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: "2021-08-01",
  },
  {
    title: "Fire Weasel",
    subtitle: "Level 3",
    badge: "dummy-badge",
    unlocked: false,
    date: "2021-08-01",
  },
];

const ProfileBadgeContainerPreview = () => {
  const renderBadges = () => {
    const latestBadges = badgeData
      .filter((badge) => badge.unlocked)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
      .slice(0, 3);

    return latestBadges.map((badge, index) => (
      <BadgeContainer
        key={index}
        title={badge.title}
        subtitle={badge.subtitle}
        badge={badge.badge}
        unlocked={badge.unlocked}
      />
    ));
  };

  const latestBadges = badgeData
    .filter((badge) => badge.unlocked)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 3);

  const renderLockedBadges = () => {
    const lockedBadges = badgeData.slice(0, 3);
    return lockedBadges.map((badge, index) => (
      <BadgeContainer
        key={index}
        title={badge.title}
        subtitle={badge.subtitle}
        badge={badge.badge}
        unlocked={badge.unlocked}
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
