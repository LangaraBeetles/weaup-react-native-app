import { styled } from "@fast-styles/react";
import { View } from "react-native";

import DummyBadge from "assets/badges/dummy-badge.svg";
import Locked from "assets/badges/locked.svg";
import Challenge from "assets/badges/challenge.svg";
import Streak from "assets/badges/streak.svg";
import XP from "assets/badges/xp.svg";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import Svg, { Text } from "react-native-svg";
import { theme } from "@src/styles/theme";

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
  unlocked?: boolean;
  size?: "small" | "large";
};

const Badge: React.FC<BadgeProps> = ({
  name,
  color = "#7457DD",
  title = "",
  subtitle = "",
  unlocked,
  size = "small",
}) => {
  const CustomBadge = BadgeConfig[name];

  return (
    <StyledView category={size}>
      <BadgeTitle>
        {/* {unlocked && ( */}
        {/* // <StrokeText
          //   text={title}
          //   fontSize={size === "small" ? 24 : 52}
          //   color={"#ffffff"}
          //   strokeColor={"#FDB022"}
          //   strokeWidth={size === "small" ? 5 : 10}
          //   fontFamily="FredokaOneRegular"
          // /> */}
        <Svg height={size === "small" ? "24" : "52"} width="100">
          <Text
            fill={theme.colors.white}
            stroke="#FDB022"
            fontSize={size === "small" ? "22" : "50"}
            fontWeight="bold"
            strokeWidth={size === "small" ? 2 : 3}
            letterSpacing="1"
            x="50"
            y="20"
            textAnchor="middle"
            fontFamily="FredokaOneRegular"
          >
            {title}
          </Text>
        </Svg>
        {/* )} */}
      </BadgeTitle>
      <CustomBadge width="100%" height="100%" />
      <BadgeSubtitle>
        {/* <StrokeText
          text={subtitle}
          fontSize={size === "small" ? 24 : 32}
          color={"#ffffff"}
          strokeColor={color}
          strokeWidth={8}
          numberOfLines={2}
          width={200}
          fontFamily="FredokaOneRegular"
        /> */}
        <Svg height={size === "small" ? "22" : "26"} width="200">
          <Text
            fill={theme.colors.white}
            stroke={color}
            fontSize={size === "small" ? "20" : "24"}
            fontWeight="bold"
            letterSpacing="1"
            x="100"
            y="20"
            textAnchor="middle"
            fontFamily="FredokaOneRegular"
          >
            STROKED
          </Text>
        </Svg>
        <Svg height={size === "small" ? "22" : "26"} width="200">
          <Text
            fill={theme.colors.white}
            stroke={color}
            fontSize={size === "small" ? "20" : "24"}
            fontWeight="bold"
            x="100"
            y="20"
            letterSpacing="1"
            textAnchor="middle"
            fontFamily="FredokaOneRegular"
          >
            TEXT
          </Text>
        </Svg>
      </BadgeSubtitle>
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

const BadgeTitle = styled(View, {
  position: "absolute",
  zIndex: 1,
});

const BadgeSubtitle = styled(View, {
  position: "absolute",
  bottom: -20,
  zIndex: 1,
});
