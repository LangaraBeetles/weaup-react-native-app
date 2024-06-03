import { PostureStateType } from "@src/interfaces/headtracking.types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  isDeviceMotionActive,
  isHeadphoneMotionAvailable,
  startDeviceMotionUpdates,
  stopDeviceMotionUpdates,
  getLatestDeviceMotion,
  onDeviceMotionUpdates,
} from "react-native-headphone-motion";

type ContextState = {
  isHeadMotionAvailable: boolean;
  posture: PostureStateType;
  startTracking?: () => Promise<void>;
  stopTracking?: () => Promise<void>;
  getCurrentPosture?: () => Promise<void>;
};

const initialState: ContextState = {
  isHeadMotionAvailable: false,
  posture: "not_tracking",
};

const HeadTrackingContext = createContext<ContextState>(initialState);

const HeadTrackingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isHeadMotionAvailable = useMemo(
    () => isHeadphoneMotionAvailable,
    [isHeadphoneMotionAvailable]
  );

  const [postureStatus, setPoture] = useState<"good" | "bad" | "not_tracking">(
    "not_tracking"
  );

  const handlePostureCorrectionAlert = (headPitch?: number) => {
    if (headPitch === undefined) {
      postureStatus !== "not_tracking" && setPoture("not_tracking");
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

    setInterval(async () => {
      const data = await getLatestDeviceMotion();
      if (data) {
        const headPitch = data?.attitude.pitchDeg;
        handlePostureCorrectionAlert(headPitch);
        // if (headPitch === undefined && posture !== "not_tracking") {
        //   setPoture("not_tracking");
        // } else if (headPitch > -15 && headPitch < 15) {
        //   console.log("Yey!");
        //   posture !== "good" && setPoture("good");
        // } else {
        //   console.log("Bad!");
        //   posture !== "bad" && setPoture("bad");
        // }
      }
    }, 1000);
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
      setPoture("not_tracking");
    }
  };

  const stopTracking = async () => {
    await stopDeviceMotionUpdates();
    setPoture("not_tracking");
  };

  useEffect(() => {
    onDeviceMotionUpdates((data) => {
      const headPitch = data.attitude.pitchDeg;
      handlePostureCorrectionAlert(headPitch);
    });
  }, []);

  return (
    <HeadTrackingContext.Provider
      value={{
        isHeadMotionAvailable,
        posture: postureStatus,
        startTracking,
        stopTracking,
        getCurrentPosture,
      }}
    >
      {children}

      {/*     <SafeAreaView>
      <Center
          justifyContent="center"
          alignItems="center"
          backgroundColor={
            postureStatus == "bad"
              ? "crimson"
              : postureStatus === "good"
              ? "green"
              : "white"
          }
          height="100%"
        >
          <Text>
            {postureStatus === "bad"
              ? "Yikes!"
              : postureStatus === "good"
              ? "Well done!"
              : "No Data"}
          </Text>

          <Button title="Start tracking" onPress={startTracking} />
          <Button title="Stop tracking" onPress={stopTracking} />
        </Center> 
            </SafeAreaView>*/}
    </HeadTrackingContext.Provider>
  );
};

export default HeadTrackingProvider;

export const useHeadTracking = () => {
  const context = useContext(HeadTrackingContext);
  if (!context) {
    throw Error(
      "You need to wrap the components with the HeadTrackingProvider"
    );
  }
  return context;
};
