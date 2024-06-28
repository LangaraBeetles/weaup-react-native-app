import { TrackingModeType } from "@src/interfaces/user.types";
import { useUser } from "@src/state/useUser";
import { createContext, useEffect } from "react";
import {
  onHeadphoneConnected,
  onHeadphoneDisconnected,
  isHeadphoneMotionAvailable,
  startDeviceMotionUpdates,
} from "react-native-headphone-motion";

type ContextState = {
  mode: TrackingModeType;
};

const initialState: ContextState = {
  mode: "phone",
};

const TrackingModeContext = createContext<ContextState>(initialState);

const TrackingModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mode = useUser((state) => state.mode);
  const changeMode = useUser((state) => state.changeMode);

  useEffect(() => {
    startDeviceMotionUpdates();

    const connectedListener = onHeadphoneConnected(() => {
      console.log("earbuds connected");
      if (isHeadphoneMotionAvailable) {
        changeMode("earbuds");
      }
    });

    const disconnectedListener = onHeadphoneDisconnected(() => {
      console.log("earbuds disconnected");
      changeMode("phone");
    });

    return () => {
      connectedListener?.remove();
      disconnectedListener?.remove();
    };
  }, []);

  return (
    <TrackingModeContext.Provider
      value={{
        mode,
      }}
    >
      {children}
    </TrackingModeContext.Provider>
  );
};

export default TrackingModeProvider;
