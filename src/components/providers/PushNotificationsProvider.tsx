import React, { createContext, useContext, useEffect } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { globalStyles } from "@src/styles/globalStyles";

type PushNotificationsContextState = {
  sendPushNotification: (notificationContent: NotificationContent) => Promise<void>;
};

type NotificationContent = {
  title: string;
  body: string;
};

const PushNotificationsContext = createContext<PushNotificationsContextState>({
  sendPushNotification: async () => {
    throw new Error("sendPushNotification not implemented");
  },
});

const PushNotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            Alert.alert('Failed to get push token for push notification!');
            return;
          }

          const token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          Alert.alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: globalStyles.notificationLightColor,
          });
        }
      } catch (error) {
        console.error('Error during push notification registration:', error);
        Alert.alert('Error', 'Failed to register for push notifications.');
      }
    };

    const setNotificationHandler = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
    };

    registerForPushNotificationsAsync();
    setNotificationHandler();
  }, []);

  const sendPushNotification = async ({ title, body }: NotificationContent) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
      Alert.alert('Error', 'Failed to send push notification.');
    }
  };

  return (
    <PushNotificationsContext.Provider
      value={{
        sendPushNotification,
      }}
    >
      {children}
    </PushNotificationsContext.Provider>
  );
};

export default PushNotificationsProvider;

export const usePushNotifications = () => {
  const context = useContext(PushNotificationsContext);
  if (!context) {
    throw new Error("You need to wrap the components with the PushNotificationsProvider");
  }
  return context;
};
