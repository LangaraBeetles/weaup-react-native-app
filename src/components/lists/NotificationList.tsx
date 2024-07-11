import { FlatList } from "react-native";
import NotificationCard from "../notifications/NotificationCard";
import { NotificationType } from "@src/interfaces/notification.types";

const NotificationList = ({
  notifications,
  onRefresh,
  ListEmptyComponent,
}: {
  notifications: NotificationType[];
  onRefresh: () => void;
  ListEmptyComponent: () => JSX.Element;
}) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <NotificationCard item={item} />}
      refreshing={false}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default NotificationList;
