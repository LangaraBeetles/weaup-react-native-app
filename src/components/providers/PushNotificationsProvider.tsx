import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

type PushNotificationsContextState = {
  isPushEnabled: boolean;
  setPushEnabled?: (value: boolean) => void;
  sendPushNotification?: (notificationContent: {
    title: string;
    body: string;
  }) => Promise<void>;
};

const initialState: PushNotificationsContextState = {
  isPushEnabled: false,
};

const PushNotificationsContext = createContext<PushNotificationsContextState>(initialState);

const PushNotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPushEnabled, setPushEnabled] = useState<boolean>(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
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
      console.log('Expo Push Token:', token);
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const sendPushNotification = async ({ title, body }: { title: string; body: string }) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  };

  // Notification handlers
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <PushNotificationsContext.Provider
      value={{
        isPushEnabled,
        setPushEnabled,
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
    throw Error(
      "You need to wrap the components with the PushNotificationsProvider"
    );
  }
  return context;
};
