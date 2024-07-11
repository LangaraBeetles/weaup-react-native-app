import { theme } from "@src/styles/theme";
import Box from "../ui/Box";
import { Text } from "../ui/typography";
import Stack from "../ui/Stack";
import Icon, { IconName } from "../ui/Icon";

interface SessionCardProps {
  title: string;
  content: string | number;
  icon: IconName;
  iconColor?: string;
}

const SessionCard: React.FC<SessionCardProps> = ({
  title,
  content,
  icon,
  iconColor,
}) => {
  return (
    <Box>
      <Stack flexDirection="row" gap={8}>
        <Icon name={icon} size={16} color={iconColor} />
        <Text level="caption_3" style={{ color: theme.colors.neutral[400] }}>
          {title}
        </Text>
      </Stack>
      <Text level="title_1" style={{ paddingLeft: 20 }}>
        {content}
      </Text>
    </Box>
  );
};

export default SessionCard;
