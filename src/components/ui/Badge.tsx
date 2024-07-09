import { styled } from "@fast-styles/react";
import { View } from "react-native";

import DummyBadge from "assets/badges/dummy-badge.svg";
import Locked from "assets/badges/locked.svg";
import Challenge from "assets/badges/challenge.svg";
import Streak from "assets/badges/streak.svg";
import XP from "assets/badges/xp.svg";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";

const BadgeConfig = {
  "dummy-badge": DummyBadge,
  locked: Locked,
  challenge: Challenge,
  streak: Streak,
  xp: XP,
};

export type BadgeName = `${keyof typeof BadgeConfig}`;

// TODO: Display subtitle according to design
type BadgeProps = {
  name: BadgeName;
  color?: string;
  title?: string;
  subtitle?: string;
};

const Badge: React.FC<BadgeProps> = ({ name, title = "" }) => {
  const CustomBadge = BadgeConfig[name];

  return (
    <StyledView>
      <BadgeTitle>
        <StrokeText
          text={title}
          fontSize={24}
          color="#ffffff"
          strokeColor="#FDB022"
          strokeWidth={5}
          fontFamily="FredokaOneRegular"
        />
      </BadgeTitle>
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
});

const BadgeTitle = styled(View, {
  position: "absolute",
  zIndex: 1,
});
