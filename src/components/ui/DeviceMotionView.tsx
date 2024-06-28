import React, { useEffect, useState } from "react";

import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import * as Haptics from "expo-haptics";
import { DeviceMotion } from "expo-sensors";
import { Switch, Text } from "react-native";

export default function DeviceMotionViewiOS() {
  const isTrackingEnabled = useUser((state) => state.isTrackingEnabled);
  const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);

  const currentPosture = useUser((state) => state.currentPosture);
  const setCurrentPosture = useUser((state) => state.setCurrentPosture);
  const mode = useUser((state) => state.mode);

  const toggleTracking = () => {
    const value = !isTrackingEnabled;

    if (!value) {
      setCurrentPosture("not_reading");
    } else {
      DeviceMotion.requestPermissionsAsync();
    }
    setTrackingEnabled(value);
  };

  useEffect(() => {
    const _subscribe = async () => {
      try {
        DeviceMotion.addListener((devicemotionData) => {
          try {
            // Given acceleration including gravity components
            const a_y = devicemotionData?.accelerationIncludingGravity?.y;
            const a_z = devicemotionData?.accelerationIncludingGravity?.z;

            // Function to convert radians to degrees
            function radiansToDegrees(radians: number) {
              return radians * (180 / Math.PI);
            }
            // Calculate pitch in radians
            const pitchRadians = Math.atan2(a_y, a_z);
            // Convert pitch to degrees
            const pitchDegrees = radiansToDegrees(pitchRadians);

            // TODO: improve haptics feedback
            if (pitchDegrees < -120 && pitchDegrees > -175) {
              if (currentPosture !== "bad") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }

              setCurrentPosture("bad");
            } else if (pitchDegrees < -110 && pitchDegrees > -120) {
              if (currentPosture !== "mid") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              }

              setCurrentPosture("mid");
            } else if (pitchDegrees < -90 && pitchDegrees > -110) {
              setCurrentPosture("good");
            } else {
              setCurrentPosture("not_reading");
            }
          } catch (error: any) {
            console.error(error.message);
          }
        });
        DeviceMotion.setUpdateInterval(1000);
      } catch (error) {
        console.error(error);
      }
    };

    const _unsubscribe = () => {
      DeviceMotion.removeAllListeners();
    };

    if (isTrackingEnabled && mode === "phone") {
      _subscribe();
    } else {
      setCurrentPosture("not_reading");
    }

    return () => {
      _unsubscribe();
    };
  }, [isTrackingEnabled, mode, currentPosture]);

  return (
    <Stack
      flexDirection="row"
      border={1}
      borderRadius={20}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      p={10}
    >
      <Text>Realtime Tracking</Text>
      <Switch onValueChange={toggleTracking} value={isTrackingEnabled} />
    </Stack>
  );
}

export function DeviceMotionViewAndroid() {
  const isTrackingEnabled = useUser((state) => state.isTrackingEnabled);
  const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);

  const setCurrentPosture = useUser((state) => state.setCurrentPosture);
  const mode = useUser((state) => state.mode);

  const [{ beta, gamma }, setRotationData] = useState({ beta: 0, gamma: 0 });
  const [orientation, setOrientation] = useState(0);

  const toggleTracking = () => {
    const value = !isTrackingEnabled;

    if (!value) {
      setCurrentPosture("not_reading");
    } else {
      DeviceMotion.requestPermissionsAsync();
    }
    setTrackingEnabled(value);
  };
  //Get RotationData
  useEffect(() => {
    if (isTrackingEnabled && mode === "phone") {
      _subscribe();
    } else {
      setCurrentPosture("not_reading");
    }
    return () => {
      _unsubscribe();
    };
  }, [isTrackingEnabled, mode]);

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
    if (beta < 0.03 && gamma < 0.03) {
      //device is on a flat surface
      return;
    }

    if (isBadPosture()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setCurrentPosture("bad");
    } else {
      setCurrentPosture("good");
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
    <Stack
      flexDirection="row"
      border={1}
      borderRadius={20}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      p={10}
    >
      <Text>Realtime Tracking</Text>
      <Switch onValueChange={toggleTracking} value={isTrackingEnabled} />
    </Stack>
  );
}
