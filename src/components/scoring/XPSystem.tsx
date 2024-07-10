import { useEffect } from "react";
import { useUser } from "@src/state/useUser";

const XPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const currentPosture = useUser((state) => state.currentPosture);
  const isTrackingActive = useUser(
    (state) => state.sessionStatus === "ACTIVE" || state.isTrackingEnabled,
  );
  const postureData = useUser((state) => state.postureData);
  const sessionPostureData = useUser((state) => state.sessionPostureData);
  const setXP = useUser((state) => state.setXP);

  useEffect(() => {
    if (postureData.length % 5 === 0 || sessionPostureData.length % 5 === 0) {
      if (userHP > 0 && currentPosture === "good" && isTrackingActive) {
        setXP((prevXP) => prevXP + 10);
      }
    }
  }, [
    postureData.length,
    userHP,
    currentPosture,
    setXP,
    isTrackingActive,
    sessionPostureData.length,
  ]);

  return null;
};

export default XPSystem;
