import React, { useEffect, useState } from "react";

import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import * as Haptics from "expo-haptics";
import { DeviceMotion } from "expo-sensors";
import { Switch } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { saveActiveMonitoring } from "@src/services/activeMonitoringApi";

export default function DeviceMotionViewiOS() {
  const isRealTimeTracking = useUser((state) => state.isTrackingEnabled);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const isTrackingEnabled = useUser(
    (state) => state.isTrackingEnabled || state.sessionStatus !== "INACTIVE",
  );

  const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);
  const setTimeStart = useUser((state) => state.setTimeStart);
  const setTimeEnd = useUser((state) => state.setTimeEnd);
  const timeStart = useUser((state) => state.timeStart);
  const timeEnd = useUser((state) => state.timeEnd);

  const currentPosture = useUser((state) => state.currentPosture);
  const setCurrentPosture = useUser((state) => state.setCurrentPosture);
  const mode = useUser((state) => state.mode);
  const userId = useUser((state) => state.user.id);

  const toggleTracking = () => {
    const value = !isRealTimeTracking;

    if (!value) {
      setCurrentPosture("not_reading");
      setTimeEnd(new Date());
    } else {
      DeviceMotion.requestPermissionsAsync();
      setTimeStart(new Date());
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
            console.log(error.message);
          }
        });
        DeviceMotion.setUpdateInterval(1000);
      } catch (error) {
        console.log(error);
      }
    };

    const _unsubscribe = () => {
      DeviceMotion.removeAllListeners();
    };

    if (isTrackingEnabled && mode === "phone") {
      _subscribe();
    }

    if (!isTrackingEnabled) {
      setCurrentPosture("not_reading");
    }

    return () => {
      _unsubscribe();
    };
  }, [isTrackingEnabled, mode, currentPosture]);

  useEffect(() => {
    if (timeStart && timeEnd) {
      const activeMonitoring = {
        user_id: userId,
        startTime: timeStart,
        endTime: timeEnd,
      };

      saveActiveMonitoring(activeMonitoring)
        .then(() => {
          setTimeStart(null);
          setTimeEnd(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [timeStart, timeEnd]);

  return (
    <Stack
      flexDirection="row"
      borderRadius={20}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      py={10}
      px={24}
      backgroundColor="white"
      style={{ display: sessionStatus === "INACTIVE" ? "flex" : "none" }}
    >
      <Text level="footnote" weight="semibold">
        Active Monitoring
      </Text>
      <Switch
        trackColor={{
          true: theme.colors.secondary[600],
        }}
        onValueChange={toggleTracking}
        value={isTrackingEnabled}
      />
    </Stack>
  );
}

export function DeviceMotionViewAndroid() {
  const isRealTimeTracking = useUser((state) => state.isTrackingEnabled);
  const sessionStatus = useUser((state) => state.sessionStatus);

  const isTrackingEnabled = useUser(
    (state) => state.isTrackingEnabled || state.sessionStatus !== "INACTIVE",
  );
  const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);
  const setTimeStart = useUser((state) => state.setTimeStart);
  const setTimeEnd = useUser((state) => state.setTimeEnd);
  const timeStart = useUser((state) => state.timeStart);
  const timeEnd = useUser((state) => state.timeEnd);

  const userId = useUser((state) => state.user.id);

  const setCurrentPosture = useUser((state) => state.setCurrentPosture);

  const [{ beta, gamma }, setRotationData] = useState<{
    beta: number;
    gamma: number;
  }>({ beta: 0, gamma: 0 });
  const [orientation, setOrientation] = useState<number>(0);

  const toggleTracking = () => {
    const value = !isRealTimeTracking;

    if (!value) {
      setCurrentPosture("not_reading");
      setTimeEnd(new Date());
    } else {
      DeviceMotion.requestPermissionsAsync();
      setTimeStart(new Date());
    }
    setTrackingEnabled(value);
  };

  // Manage device motion subscription
  useEffect(() => {
    if (isTrackingEnabled) {
      _subscribe();
    } else {
      _unsubscribe();
    }

    return () => {
      _unsubscribe();
    };
  }, [isTrackingEnabled]);

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
      console.log(error);
    }
  };

  const _unsubscribe = () => {
    DeviceMotion.removeAllListeners();
  };

  // Provide feedback based on posture
  useEffect(() => {
    if (!isTrackingEnabled) {
      setCurrentPosture("not_reading");
      return;
    }

    if (beta < 0.03 && gamma < 0.03) {
      // device is on a flat surface
      return;
    }

    if (isBadPosture()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setCurrentPosture("bad");
    } else {
      setCurrentPosture("good");
    }
  }, [beta, gamma, isTrackingEnabled]);

  const isBadPosture = () => {
    return (
      (orientation === 0 && inBadPostureRange(beta)) ||
      (orientation !== 0 && inBadPostureRange(gamma))
    );
  };

  const inBadPostureRange = (data: number) => {
    return data > 1.4 || data < 1;
  };

  useEffect(() => {
    if (timeStart && timeEnd) {
      const activeMonitoring = {
        user_id: userId,
        startTime: timeStart,
        endTime: timeEnd,
      };

      saveActiveMonitoring(activeMonitoring)
        .then(() => {
          setTimeStart(null);
          setTimeEnd(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [timeStart, timeEnd]);

  return (
    <Stack
      flexDirection="row"
      borderRadius={12}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      py={10}
      px={24}
      backgroundColor={theme.colors.white}
      style={{ display: sessionStatus === "INACTIVE" ? "flex" : "none" }}
    >
      <Text level="footnote" weight="semibold">
        Active Monitoring
      </Text>
      <Switch
        onValueChange={toggleTracking}
        trackColor={{
          true: theme.colors.secondary[600],
        }}
        value={isTrackingEnabled}
      />
    </Stack>
  );
}
