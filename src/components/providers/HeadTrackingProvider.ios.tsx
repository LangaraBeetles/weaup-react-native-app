import { PostureStatus } from "@src/interfaces/posture.types";
import { useUser } from "@src/state/useUser";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import {
  isDeviceMotionActive,
  isHeadphoneMotionAvailable,
  startDeviceMotionUpdates,
  getLatestDeviceMotion,
  onDeviceMotionUpdates,
} from "react-native-headphone-motion";

type ContextState = {
  isHeadMotionAvailable: boolean;
  posture: PostureStatus;
  getCurrentPosture?: () => Promise<void>;
  startSession: () => void;
  stopSession: () => void;
};

const initialState: ContextState = {
  isHeadMotionAvailable: false,
  posture: "not_reading",
  startSession: () => {},
  stopSession: () => {},
};

const HeadTrackingContext = createContext<ContextState>(initialState);

const HeadTrackingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isHeadMotionAvailable = useMemo(
    () => isHeadphoneMotionAvailable,
    [isHeadphoneMotionAvailable],
  );

  let isTracking = useRef<boolean>(false).current;
  const interval = useRef<any>(null);

  const mode = useUser((state) => state.mode);
  const isTrackingEnabled = useUser((state) => state.isTrackingEnabled);
  const postureStatus = useUser((state) => state.currentPosture);
  const setPosture = useUser((state) => state.setCurrentPosture);
  const isSessionActive = useUser((state) => state.isSessionActive);
  const setSessionActive = useUser((state) => state.setSessionActive);

  const handlePostureCorrectionAlert = (headPitch?: number) => {
    if (headPitch === undefined) {
      postureStatus !== "not_reading" &&
        setPosture("not_reading", isSessionActive);
    } else if (headPitch > -15 && headPitch < 15) {
      console.log("Yey!");
      postureStatus !== "good" && setPosture("good", isSessionActive);
    } else {
      console.log("Bad!");
      postureStatus !== "bad" && setPosture("bad", isSessionActive);
    }
  };

  const startTracking = async () => {
    const isActive = await isDeviceMotionActive();
    if (!isActive) {
      await startDeviceMotionUpdates();
    }

    isTracking = true;
    interval.current = setInterval(
      async (isEnabled, mode) => {
        if (isEnabled && mode === "earbuds") {
          const data = await getLatestDeviceMotion();
          if (data) {
            const headPitch = data?.attitude.pitchDeg;
            handlePostureCorrectionAlert(headPitch);
          }
        }
      },
      1000,
      isTrackingEnabled,
      mode,
    );
  };

  const getCurrentPosture = async () => {
    const isActive = await isDeviceMotionActive();

    if (!isActive) {
      await startDeviceMotionUpdates();
    }

    const data = await getLatestDeviceMotion();
    if (data) {
      const headPitch = data?.attitude.pitchDeg;
      handlePostureCorrectionAlert(headPitch);
    } else {
      setPosture("not_reading", isSessionActive);
    }
  };

  const stopTracking = async () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    isTracking = false;
    setPosture("not_reading", isSessionActive);
  };

  const startSession = () => {
    setSessionActive(true);
    startTracking();
  };

  const stopSession = () => {
    setSessionActive(false);
    stopTracking();
  };

  useEffect(() => {
    onDeviceMotionUpdates((data) => {
      const headPitch = data.attitude.pitchDeg;
      handlePostureCorrectionAlert(headPitch);
    });
  }, []);

  useEffect(() => {
    if (mode === "earbuds" && !isTracking && isTrackingEnabled) {
      startTracking();
    }

    if (mode !== "earbuds" || !isTrackingEnabled) {
      stopTracking();
    }
  }, [mode, isTracking, isTrackingEnabled]);

  return (
    <HeadTrackingContext.Provider
      value={{
        isHeadMotionAvailable,
        posture: postureStatus,
        getCurrentPosture,
        startSession,
        stopSession,
      }}
    >
      {children}
    </HeadTrackingContext.Provider>
  );
};

export default HeadTrackingProvider;

export const useHeadTracking = () => {
  const context = useContext(HeadTrackingContext);
  if (!context) {
    throw Error(
      "You need to wrap the components with the HeadTrackingProvider",
    );
  }
  return context;
};
