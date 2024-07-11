import React, { useState, useEffect } from "react";
import { AppStateStatus, AppState } from "react-native";
import { useQuery, focusManager } from "@tanstack/react-query";
import Page from "@src/components/layout/Page";
import FilterMenu from "../components/notifications/FilterMenu";
import NotificationList from "@src/components/lists/NotificationList";
import ListSkeleton from "@src/components/ui/ListSkeleton";
import { getNotifications } from "@src/services/notificationsApi";
import { theme } from "@src/styles/theme";
import { Text } from "@src/components/ui/typography";
import { useUser } from "@src/state/useUser";
import { NotificationType } from "@src/interfaces/notification.types";

const Notifications = () => {
  const userId = useUser((state) => state.user.id);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
  });

  const onAppStateChange = (status: AppStateStatus) => {
    focusManager.setFocused(status === "active");
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  const notificationsData = data?.data || [];

  const filteredNotifications: NotificationType[] = notificationsData.filter(
    (notification: NotificationType) =>
      selectedFilter === "All" ||
      notification.notification_type === selectedFilter,
  );

  useEffect(() => {}, [filteredNotifications]);

  return (
    <Page
      backButtonShown={true}
      title="Notifications"
      gradientProps={{
        colors: [theme.colors.primary[300], theme.colors.surface],
      }}
      header={
        <FilterMenu
          tabs={[
            { value: "All", label: "All" },
            { value: "daily_summary", label: "Summary" },
            { value: "Challenge", label: "Challenge" },
          ]}
          onChange={setSelectedFilter}
        />
      }
    >
      {isLoading ? (
        <ListSkeleton />
      ) : isError ? (
        <Text>Error loading notifications</Text>
      ) : (
        <NotificationList
          notifications={filteredNotifications}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <Text
              align="center"
              style={{ color: theme.colors.neutral[300], marginBottom: 8 }}
            >
              No notifications found
            </Text>
          )}
        />
      )}
    </Page>
  );
};

export default Notifications;
