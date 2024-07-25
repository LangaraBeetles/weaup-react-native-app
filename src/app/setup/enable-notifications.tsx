import { usePushNotifications } from "@root/src/components/providers/PushNotificationsProvider";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import ContentCard from "@src/components/setup/ContentCard";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import { Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("screen");

const EnableNotificationsScreen = () => {
  const { registerForPushNotifications } = usePushNotifications();

  const next = () => {
    registerForPushNotifications(() => {
      router.push("/setup/set-up-goal");
    });
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <BackgroundGradient />
        {height < 850 && Platform.OS == "android" ? (
          ""
        ) : (
          <Stack
            style={{ position: "absolute", left: width * 0.5 - 170, top: -20 }}
          >
            <Image name="notification-window" width={340} height={200} />
          </Stack>
        )}
        <Stack style={{ position: "absolute", left: 70, top: 160 }}>
          <Image name="notification" width={32} height={121} />
        </Stack>
        <Center
          w={236}
          h={456}
          style={{
            marginHorizontal: "auto",
            marginTop: height * 0.15,
          }}
        >
          <Image name="weasel-happy" />
        </Center>
        <ContentCard
          title="Get Real-time Alerts"
          text={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor."
          }
        />
        {/* TODO: Allow notifications functionality */}
        <Stack w={width * 0.9} gap={12} style={styles.buttonStack}>
          <Button
            title="Allow Notifications"
            onPress={next}
            variant="primary"
          />
          <Button title="Maybe Later" onPress={next} variant="secondary" />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonStack: {
    position: "absolute",
    bottom:
      height < 850 && Platform.OS == "android" ? height * 0.07 : height * 0.15,
    zIndex: 3,
  },
});

export default EnableNotificationsScreen;
