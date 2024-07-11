import { Text } from "../ui/typography";
import { StyleSheet, View } from "react-native";
import Divider from "../ui/Divider";
import { theme } from "@src/styles/theme";
import { NotificationType } from "@src/interfaces/notification.types";
import dayjs from "dayjs";
import Stack from "../ui/Stack";
import Icon from "../ui/Icon";

const NotificationCard = ({ item }: { item: NotificationType }) => {
  const diff = dayjs().diff(dayjs(item.createdAt), "day");

  const displayTime = () => {
    const isValidDate = dayjs(item.createdAt).isValid();
    if (!isValidDate) {
      return item.createdAt;
    }

    if (diff === 0) {
      return dayjs(item.createdAt).format("h:mm A");
    }
    if (diff === 1) {
      return "Yesterday";
    }
    if (diff > 1) {
      return dayjs(item.createdAt).format("DD-MM-YYYY");
    }
  };

  return (
    <View>
      <Stack flexDirection="row" pb={16} pt={16} gap={12}>
        {item.notification_type === "daily_summary" && (
          <Stack
            w={40}
            h={40}
            backgroundColor={theme.colors.secondary[200]}
            borderRadius={40}
            justifyContent="center"
            alignItems="center"
            style={{ top: 4 }}
          >
            <Icon
              name="copy-fill"
              color={theme.colors.secondary[800]}
              size={24}
            />
          </Stack>
        )}
        <Stack flex={1}>
          <Text
            style={styles.notificationTitle}
            level="footnote"
            weight="semibold"
          >
            {item.title}
          </Text>
          <Text style={styles.notificationDetail} level="caption_1">
            {item.message}
          </Text>
        </Stack>

        <Text style={styles.notificationTime} level="caption_1">
          {displayTime()}
        </Text>
      </Stack>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationTitle: {
    flexShrink: 1,
  },
  notificationTime: {
    color: theme.colors.neutral[400],
    marginLeft: 10,
  },
  notificationDetail: {
    color: theme.colors.neutral[400],
    maxWidth: "90%",
  },
});

export default NotificationCard;
