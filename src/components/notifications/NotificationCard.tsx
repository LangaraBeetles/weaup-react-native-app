import { Text } from "../ui/typography";
import { StyleSheet, View, Image } from "react-native";
import Divider from "../ui/Divider";
import { theme } from "@src/styles/theme";
import { NotificationType } from "@src/interfaces/notification.types";

const NotificationCard = ({ item }: { item: NotificationType }) => {
  return (
    <View style={styles.notification}>
      <Image
        source={require("../../../assets/img/avatar.png")}
        style={styles.avatar}
      />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={styles.notificationTitle}
            level="footnote"
            weight="semibold"
          >
            {item.title}
          </Text>
          <Text style={styles.notificationTime} level="caption_1">
            {item.createdAt}
          </Text>
        </View>
        <Text style={styles.notificationDetail} level="caption_1">
          {item.message}
        </Text>
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 15,
    marginHorizontal: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  notificationTitle: {
    flexShrink: 1,
  },
  notificationTime: {
    color: theme.colors.neutral[400],
    marginLeft: 10,
  },
  notificationDetail: {
    color: theme.colors.neutral[400],
  },
});

export default NotificationCard;
