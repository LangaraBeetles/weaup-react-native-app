import { FlatList, Text } from "react-native";
import NotificationCard from "../notifications/NotificationCard";
import { NotificationType } from "@src/interfaces/notification.types";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@src/state/useUser";
import { getNotifications } from "@src/services/notificationsApi";

const NotificationList = ({ selectedFilter }: { selectedFilter: string }) => {
  const userId = useUser((state) => state.user.id);

  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(userId),
  });

  if (isLoading) {
    return <Text>Loading notifications...</Text>;
  }

  if (isError) {
    return <Text>Error loading notifications</Text>;
  }

  const filteredNotifications: NotificationType[] =
    notificationsData.data.filter(
      (notification: NotificationType) =>
        selectedFilter === "All" ||
        notification.notification_type === selectedFilter,
    );

  return (
    <FlatList
      data={filteredNotifications}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <NotificationCard item={item} />}
    />
  );
};

export default NotificationList;
