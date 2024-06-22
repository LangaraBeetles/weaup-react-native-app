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
};

const initialState: ContextState = {
  isHeadMotionAvailable: false,
  posture: "not_reading",
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
  const setPoture = useUser((state) => state.setCurrentPosture);
  const postureData = useUser((state) => state.postureData);

  const handlePostureCorrectionAlert = (headPitch?: number) => {
    if (headPitch === undefined) {
      postureStatus !== "not_reading" && setPoture("not_reading");
    } else if (headPitch > -15 && headPitch < 15) {
      console.log("Yey!");
      postureStatus !== "good" && setPoture("good");
    } else {
      console.log("Bad!");
      postureStatus !== "bad" && setPoture("bad");
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
        if (isEnabled && mode === "EARBUDS") {
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
      setPoture("not_reading");
    }
  };

  const stopTracking = async () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    isTracking = false;
    setPoture("not_reading");
  };

  useEffect(() => {
    onDeviceMotionUpdates((data) => {
      const headPitch = data.attitude.pitchDeg;
      handlePostureCorrectionAlert(headPitch);
    });
  }, []);

  useEffect(() => {
    if (mode === "EARBUDS" && !isTracking && isTrackingEnabled) {
      startTracking();
    }

    if (mode !== "EARBUDS" || !isTrackingEnabled) {
      stopTracking();
    }
  }, [mode, isTracking, isTrackingEnabled]);

  useEffect(() => {
    console.log({
      bad: postureData.filter((p) => p.status === "bad").length,
      good: postureData.filter((p) => p.status === "good").length,
    });
  }, [postureStatus]);

  return (
    <HeadTrackingContext.Provider
      value={{
        isHeadMotionAvailable,
        posture: postureStatus,
        getCurrentPosture,
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
