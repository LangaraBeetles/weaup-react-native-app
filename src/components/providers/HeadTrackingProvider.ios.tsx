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
  const setPosture = useUser((state) => state.setCurrentPosture);

  const handlePostureCorrectionAlert = (headPitch?: number) => {
    if (headPitch === undefined) {
      postureStatus !== "not_reading" && setPosture("not_reading");
    } else if (headPitch > -17 && headPitch < 15) {
      console.log("Yey!");
      setPosture("good");
    } else if (headPitch > -22 && headPitch <= -17) {
      console.log("Mid!");
      setPosture("mid");
    } else {
      console.log("Bad!");
      setPosture("bad");
    }
  };

  const startTracking = async () => {
    const isActive = await isDeviceMotionActive();
    if (!isActive) {
      await startDeviceMotionUpdates();
    }

    if (interval.current) {
      clearInterval(interval.current);
    }

    isTracking = true;
    interval.current = setInterval(
      async (isEnabled, mode) => {
        isTracking = true;

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
      setPosture("not_reading");
    }
  };

  const stopTracking = async () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    isTracking = false;
    setPosture("not_reading");
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
