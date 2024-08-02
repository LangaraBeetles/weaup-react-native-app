import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import Card from "./Card";
import { getActiveMonitoring } from "@src/services/activeMonitoringApi";
import { Text } from "../ui/typography";
import Stack from "../ui/Stack";
import { theme } from "@src/styles/theme";
import { getAllSessions } from "@src/services/sessionApi";
import { Session } from "@src/interfaces/posture.types";

interface ActiveMonitoringSession {
  user_id: string;
  duration: number;
}

const TotalDurationCard = () => {
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchActiveMonitoring = async () => {
      try {
        const sessions: ActiveMonitoringSession[] = await getActiveMonitoring();

        const activeTotal = sessions.reduce(
          (acc: number, session: ActiveMonitoringSession) => {
            const duration =
              typeof session.duration === "number" ? session.duration : 0;
            return acc + duration;
          },
          0,
        );

        const postureSessions: Session[] = await getAllSessions();

        const postureTotal = postureSessions.reduce(
          (acc: number, session: Session) => {
            return acc + Number(session.duration);
          },
          0,
        );

        setTotalDuration(activeTotal + postureTotal);
      } catch (error) {
        console.log(error);
      }
    };

    fetchActiveMonitoring();
  }, []);

  const formatDuration = (totalSeconds: number): string => {
    if (totalSeconds === 0) {
      return "0";
    }
    if (totalSeconds > 0 && totalSeconds < 60) {
      return "< 1 minute";
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
    <Card style={{ borderWidth: 1, borderColor: theme.colors.neutral[100] }}>
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
