import { styled } from "@fast-styles/react";
import { View } from "react-native";

import DummyBadge from "assets/badges/dummy-badge.svg";
import Locked from "assets/badges/locked.svg";
import Challenge from "assets/badges/challenge.svg";
import Streak from "assets/badges/streak.svg";
import XP from "assets/badges/xp.svg";
import XPUnlock from "assets/badges/xp-unlock.svg";
import StreakUnlock from "assets/badges/streak-unlock.svg";
import ChallengeUnlock from "assets/badges/challenge-unlock.svg";

const BadgeConfig = {
  "dummy-badge": DummyBadge,
  locked: Locked,
  challenge: Challenge,
  streak: Streak,
  xp: XP,
  "xp-unlock": XPUnlock,
  "streak-unlock": StreakUnlock,
  "challenge-unlock": ChallengeUnlock,
};

export type BadgeName = `${keyof typeof BadgeConfig}`;

type BadgeProps = {
  name: BadgeName;
  color?: string;
  title?: string;
  subtitle?: string;
  unlocked?: boolean;
  size?: "small" | "large";
};

const Badge: React.FC<BadgeProps> = ({ name, size = "small" }) => {
  const CustomBadge = BadgeConfig[name];

  return (
    <StyledView category={size}>
      <CustomBadge width="100%" height="100%" />
    </StyledView>
  );
};

export default Badge;

const StyledView = styled(View, {
  width: 63,
  height: 63,
  justifyContent: "center",
  alignItems: "center",
  variants: {
    category: {
      small: {
        width: 63,
        height: 63,
      },
      large: {
        width: 200,
        height: 200,
      },
    },
  },
});
