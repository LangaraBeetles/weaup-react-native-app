import { createContext, useContext, useEffect, useState } from "react";

import BackgroundFetch from "react-native-background-fetch";

type ContextState = {
  isTrackingEnabled: boolean;
  counter: number;
  setTrackingEnabled?: (value: boolean) => void;
};

const initialState: ContextState = {
  isTrackingEnabled: false,
  counter: 0,
};

const BackgroundTasksContext = createContext<ContextState>(initialState);

const BackgroundTasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isTrackingEnabled, setTrackingEnabled] = useState<boolean>(false);

  const [status, setStatus] = useState(-1);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    initBackgroundFetch();
  }, []);

  const initBackgroundFetch = async () => {
    try {
      const status: number = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
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
        //Callback for the background task:
          console.log("[BackgroundFetch] taskId", taskId);
          setCounter((prevCounter) => prevCounter + 1);
          // Finish.
          BackgroundFetch.finish(taskId);
        },
        (taskId: string) => {
          // Oh No!  Our task took too long to complete and the OS has signalled
          // that this task must be finished immediately.
          console.log("[Fetch] TIMEOUT taskId:", taskId);
          BackgroundFetch.finish(taskId);
        }
      );
      console.log("BackgroundFetch configured successfully:", status);
    } catch (error) {
      console.error("BackgroundFetch configuration error:", error);
    }

    setStatus(status);
    setTrackingEnabled(true);
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
        counter,
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
