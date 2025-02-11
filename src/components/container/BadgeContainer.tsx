import Box from "../ui/Box";
import Badge, { BadgeName } from "../ui/Badge";
import { Text } from "../ui/typography";
import { styled } from "@fast-styles/react";
import { globalStyles } from "@src/styles/globalStyles";

const BadgeContainer: React.FC<{
  id: number;
  subtitle: string;
  description: string;
  color?: string;
  unlocked?: boolean;
  badge: BadgeName;
}> = ({ subtitle, description, badge, unlocked = true }) => {
  return (
    <BadgeRoot>
      <Badge name={unlocked ? badge : `locked`} unlocked={unlocked} />
      <Text
        level="caption_1"
        weight="bold"
        numberOfLines={1}
        style={{
          color: unlocked
            ? globalStyles.colors.text
            : globalStyles.colors.neutral[100],
        }}
      >
        {subtitle}
      </Text>
      <Text
        level="caption_2"
        style={{
          color: unlocked
            ? globalStyles.colors.text
            : globalStyles.colors.neutral[100],
        }}
      >
        {description}
      </Text>
    </BadgeRoot>
  );
};

export default BadgeContainer;

const BadgeRoot = styled(Box, {
  padding: 8,
  gap: 4,
  alignItems: "center",
  justifyContent: "center",
  width: 100,
  height: 125,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: globalStyles.colors.neutral[100],
});
