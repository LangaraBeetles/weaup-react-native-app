import React, { useCallback, useMemo, useRef, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import Button from "@src/components/ui/Button";
import DeviceMotionView from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import { usePushNotifications } from "@src/components/providers/PushNotificationsProvider";
import { globalStyles } from "@src/styles/globalStyles";
import SessionControl from "@src/components/sessions/SessionControl";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const setAuth = useUser((state) => state.setAuth);

  const [isTrackingEnabled, setTrackingEnabled] = useState(false);

  const { sendPushNotification } = usePushNotifications();

  const onNameChange = () => {
    setAuth(true, {
      deviceIds: ["1"],
      currentDeviceId: "1",
      dailyGoal: 80,
      name: "Dr Seuss",
    });
  };

  const onNameClear = () => {
    setAuth(false, {
      deviceIds: [],
      currentDeviceId: null,
      dailyGoal: 80,
      name: "",
    });
  };

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  const toggleBackgroundFetch = () => {
    if (setTrackingEnabled) {
      setTrackingEnabled(!isTrackingEnabled);
    }
  };

  const handleSendNotification = async () => {
    await sendPushNotification({
      title: "Devs say:",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    });
  };

  //BottomSheet
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View>
      <Text style={styles.text}>Home Page text</Text>

      {!!userName && <Text>Hello {userName}!</Text>}

      <Button
        title="Update name"
        onPress={onNameChange}
        type={{ type: "primary", size: "s" }}
      />

      <Button
        title="Reset setup"
        onPress={onNameClear}
        type={{ type: "primary", size: "l" }}
      />

      <Button
        title="Clear name"
        onPress={onNameClear}
        type={{ type: "secondary", size: "l" }}
      />

      <Button
        title={isTrackingEnabled ? "Disable Tracking" : "Enable Tracking"}
        onPress={toggleBackgroundFetch}
        type={{ type: "secondary", size: "s" }}
      />

      <SessionControl />
      
      <DeviceMotionView isTrackingEnabled={isTrackingEnabled} />

      <Button
        title="Send Notification"
        onPress={handleSendNotification}
        type={{ type: "secondary", size: "l" }}
      />

      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        type={{ type: "secondary", size: "l" }}
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
          <Button
            onPress={handleDismissModalPress}
            title="Close Bottom Sheet Modal"
            type={{ type: "secondary", size: "l" }}
          ></Button>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default HomePage;
