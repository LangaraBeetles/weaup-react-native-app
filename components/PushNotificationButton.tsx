import React, { useEffect } from 'react';
import { View, Button, Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function PushNotificationButton() {
  useEffect(() => {
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
        // On simulators the notifications will not work.
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

    registerForPushNotificationsAsync();

    const notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const notificationResponseReceivedListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationReceivedListener);
      Notifications.removeNotificationSubscription(notificationResponseReceivedListener);
    };
  }, []);

  const handlePress = async () => {
    try {
      await sendPushNotification();
    } catch (error) {
      console.error('Error sending push notification:', error);
      Alert.alert('Error', 'Failed to send push notification.');
    }
  };

  const sendPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello devs!!',
        body: 'Push notification for beetles!!!',
        // Images are difficult to send on a notification since Expo is not able to handle the local route to the image, if we need to send them, we need to upload the images into a server, host them and send them as URL.
      },
      trigger: null, // A delay can be set up as {seconds: 1 } for some devices is recomended to be sure the notification will arrive, with value null it might not work on background.
    });
  };

  // This ensures the notifications will be sent even if app is on background
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Beetles Notification" onPress={handlePress} />
    </View>
  );
}
