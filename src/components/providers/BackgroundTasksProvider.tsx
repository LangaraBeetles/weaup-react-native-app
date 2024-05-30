import { createContext, useContext, useState } from "react";

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

  //   const initBackgroundFetch = async () => {
  //     try {
  //       const status: number = await BackgroundFetch.configure(
  //         {
  //           minimumFetchInterval: 15, // 15 minutes minimum
  //           stopOnTerminate: false,
  //           enableHeadless: true,
  //           startOnBoot: true,
  //           forceAlarmManager: false,
  //           requiresCharging: false,
  //           requiresDeviceIdle: false,
  //           requiresBatteryNotLow: false,
  //           requiresStorageNotLow: false,
  //         },
  //         async (taskId: string) => {
  //           //This is the background fetch callback
  //           setCounter((prevCounter) => prevCounter + 1);
  //           console.log("[BackgroundFetch] taskId", taskId);
  //           BackgroundFetch.finish(taskId);
  //         },
  //         (taskId: string) => {
  //           console.log("[Fetch] TIMEOUT taskId:", taskId);
  //           BackgroundFetch.finish(taskId);
  //         }
  //       );
  //       console.log("BackgroundFetch configured successfully:", status);
  //     } catch (error) {
  //       console.error("BackgroundFetch configuration error:", error);
  //     }
  //   };

  return (
    <BackgroundTasksContext.Provider
      value={{
        isTrackingEnabled,
        setTrackingEnabled,
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
