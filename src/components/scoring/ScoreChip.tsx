import { theme } from "@src/styles/theme";
import Icon from "@src/components/ui/Icon";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";

const ScoreChip = ({ score }: { score?: number }) => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={8}
      border={1}
      borderColor={theme.colors.neutral[100]}
      borderRadius={100}
      px={12}
      py={8}
    >
      <Icon name="star-fill" color={theme.colors.primary[500]} />
      <Text level="callout">{score || 0}</Text>
    </Stack>
  );
};

export default ScoreChip;
