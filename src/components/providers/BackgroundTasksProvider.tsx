import { createContext, useContext, useEffect, useState } from "react";
import BackgroundFetch from "react-native-background-fetch";
import { _subscribe, _unsubscribe } from "@src/modules/MotionReader"
import { DeviceMotion } from 'expo-sensors';

type ContextState = {
  isTrackingEnabled: boolean;
  setTrackingEnabled?: (value: boolean) => void;
};

const initialState: ContextState = {
  isTrackingEnabled: false,
};

const BackgroundTasksContext = createContext<ContextState>(initialState);

const BackgroundTasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTrackingEnabled, setTrackingEnabled] = useState<boolean>(false);

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    try {
      const status: number = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 1, // <-- minutes (15 is minimum allowed)
          stopOnTerminate: false,
          enableHeadless: true,
          startOnBoot: true,
          // Android options
          forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
          requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
          requiresCharging: false, // Default
          requiresDeviceIdle: false, // Default
          requiresBatteryNotLow: false, // Default
          requiresStorageNotLow: false, // Default
        },
        async (taskId: string) => {
          //TODO: add callback for the background task:
          // console.log(DeviceMotion)
          _subscribe()
          .then(() => {
            setTimeout(() => {
              console.log("timer");
              _unsubscribe();
            }, 5);
          });
          console.log("[BackgroundFetch] taskId", taskId);

          // Finish.
          BackgroundFetch.finish(taskId);
        },
        (taskId: string) => {
          console.log("[Fetch] TIMEOUT taskId:", taskId);
          BackgroundFetch.finish(taskId);
        }
      );
      console.log("BackgroundFetch configured successfully:", status);
    } catch (error) {
      console.error("BackgroundFetch configuration error:", error);
    }

  };

  const onClickToggleEnabled = (value: boolean) => {
    setTrackingEnabled(value);

    if (value) {
      BackgroundFetch.start();
    } else {
      BackgroundFetch.stop();
    }
  };

  return (
    <BackgroundTasksContext.Provider
      value={{
        isTrackingEnabled,
        setTrackingEnabled: onClickToggleEnabled,
      }}
    >
      {children}
    </BackgroundTasksContext.Provider>
  );
};

export default BackgroundTasksProvider;

export const useBackgroundTasks = () => {
  const context = useContext(BackgroundTasksContext);
  if (!context) {
    throw Error(
      "You need to wrap the components with the BackgroundTasksProvider"
    );
  }
  return context;
};
