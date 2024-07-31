import Icon from "../ui/Icon";
import Card from "./Card";
import { Text } from "../ui/typography";
import Stack from "../ui/Stack";
import { theme } from "@src/styles/theme";

const TotalDurationCard = ({ totalDuration }: { totalDuration: number }) => {
  const formatDuration = (totalSeconds: number): string => {
    if (totalSeconds === 0) {
      return "0";
    }
    if (totalSeconds > 0 && totalSeconds < 60) {
      return `${totalSeconds}s`;
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <Card>
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap={8}>
          <Icon name="hourglass-fill" size={24} color="#816DFF" />
          <Text
            level="caption_3"
            style={{ color: theme.colors.neutral[400], alignSelf: "center" }}
          >
            Total Duration
          </Text>
        </Stack>
        <Text level="title_3">{formatDuration(totalDuration)}</Text>
      </Stack>
    </Card>
  );
};

export default TotalDurationCard;
