import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Platform, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { theme } from "@src/styles/theme";
import { Pusher, PusherEvent } from "@pusher/pusher-websocket-react-native";
import ToastMessage from "@src/components/ui/ToastMessage";
import { router } from "expo-router";
import { useUser } from "@src/state/useUser";
import config from "@root/src/config";

type PushNotificationsContextState = {
  sendPushNotification: (
    notificationContent: NotificationContent,
  ) => Promise<void>;
};

type NotificationContent = {
  title: string;
  body: string;
};

type JoinedChallengeMessage = {
  data: {
    memberName: string;
    challengeName: string;
    challengeId: string;
    notificationId: string;
  };
  message: string;
  actionText: string;
  counter: number;
  category: string;
};

const PushNotificationsContext = createContext<PushNotificationsContextState>({
  sendPushNotification: async () => {
    throw new Error("sendPushNotification not implemented");
  },
});

const PushNotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const pusherRef = useRef<Pusher | null>(null);

  const [messages, setMessages] = useState<Array<JoinedChallengeMessage>>([]);

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
      console.error("Error sending push notification:", error);
    }
  };

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      try {
        if (!Device.isDevice) {
          // Alert.alert("Must use physical device for Push Notifications");
          return;
        }

        const { status: initialStatus } =
          await Notifications.getPermissionsAsync();

        if (initialStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== "granted") {
            console.error("Failed to get push token for push notification!");
            return;
          }
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: theme.colors.neutral[200],
          });
        }
      } catch (error) {
        console.error("Error during push notification registration:", error);
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

  useEffect(() => {
    const registerPusher = async () => {
      pusherRef.current = Pusher.getInstance();

      await pusherRef.current.init({
        apiKey: config.pusher.apiKey,
        cluster: config.pusher.cluster,
      });

      await pusherRef.current.connect();

      await pusherRef.current.subscribe({
        channelName: user.id,
        onEvent: (event: PusherEvent) => {
          try {
            const data = JSON.parse(event.data);
            if (data?.category === "joined_challenge") {
              setMessages((prev) => {
                const sameId = prev?.find(
                  (ch) => ch.data.challengeId === data?.data?.challengeId,
                );

                if (!sameId) {
                  return [
                    ...prev,
                    {
                      data: data?.data,
                      message: `${data?.data?.memberName}  has joined the “${data?.data?.challengeName}” Challenge!`,
                      actionText: "View Challenge",
                      counter: 0,
                      category: data.category,
                    },
                  ];
                }

                return prev.map((ch) => {
                  if (ch.data.challengeId === sameId.data.challengeId) {
                    const counter = sameId.counter + 1;
                    return {
                      ...sameId,
                      counter,
                      message: `${data?.data?.memberName} and ${counter == 1 ? "other person has" : `${counter} others have`} joined the “${data?.data?.challengeName}” Challenge!`,
                    };
                  }

                  return ch;
                });
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      });
    };

    if (user.id) {
      registerPusher();
    }

    return () => {
      pusherRef.current?.disconnect();
    };
  }, [user.id]);

  return (
    <PushNotificationsContext.Provider
      value={{
        sendPushNotification,
      }}
    >
      {children}

      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {messages.map((displayMessage) => (
          <ToastMessage
            key={displayMessage.data.notificationId}
            message={displayMessage.message}
            actionText={displayMessage.actionText}
            onActionClick={() => {
              if (displayMessage.category === "joined_challenge") {
                router.push({
                  pathname: "/challenges/challenge-details",
                  params: { id: displayMessage.data.challengeId },
                });
                setMessages((prev) =>
                  prev.filter(
                    (ch) =>
                      ch.data.challengeId !== displayMessage.data.challengeId,
                  ),
                );
              }
            }}
            onHide={() => {
              setMessages((prev) =>
                prev.filter(
                  (ch) =>
                    ch.data.challengeId !== displayMessage.data.challengeId,
                ),
              );
            }}
          />
        ))}
      </View>
    </PushNotificationsContext.Provider>
  );
};

export default PushNotificationsProvider;

export const usePushNotifications = () => {
  const context = useContext(PushNotificationsContext);
  if (!context) {
    throw new Error(
      "You need to wrap the components with the PushNotificationsProvider",
    );
  }
  return context;
};
