import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DeviceMotion } from "expo-sensors";
import * as Haptics from "expo-haptics";

export default function DeviceMotionView(props: any) {
  const [{ beta, gamma }, setRotationData] = useState({ beta: 0, gamma: 0 });
  const [orientation, setOrientation] = useState(0);
  const [notification, setNotification] = useState(false);
  const showNotification = () => setNotification(true);
  const hideNotification = () => setNotification(false);
  const { isTrackingEnabled } = props;

  //Get RotationData
  useEffect(() => {
    if (isTrackingEnabled) {
      _subscribe();
    } else {
      hideNotification();
    }
    return () => {
      _unsubscribe();
    };
  }, [isTrackingEnabled]);

  //Get rotation and orientation values
  const _subscribe = async () => {
    try {
      DeviceMotion.addListener((devicemotionData) => {
        if (devicemotionData.rotation) {
          setRotationData(devicemotionData.rotation);
        }
        setOrientation(devicemotionData.orientation);
      });

      DeviceMotion.setUpdateInterval(1000);
    } catch (error) {
      console.error(error);
    }
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  //Provide feedback
  useEffect(() => {
    hideNotification();

    if (beta < 0.03 && gamma < 0.03) {
      //device is on a flat surface
      return;
    }

    if (isBadPosture()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      showNotification();
    }
  }, [beta, gamma]);

  const isBadPosture = () => {
    return (
      (orientation == 0 && inBadPostureRange(beta)) ||
      (orientation != 0 && inBadPostureRange(gamma))
    );
  };

  const inBadPostureRange = (data: number) => {
    return data > 1.4 || data < 1;
  };

  return (
    <View>
      <Text style={{ display: notification ? "flex" : "none" }}>
        Please check your posture.
      </Text>
    </View>
  );
}
