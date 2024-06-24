import { useEffect } from "react";
import { useUser } from "@src/state/useUser";

const XPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const currentPosture = useUser((state) => state.currentPosture);
  const postureData = useUser((state) => state.postureData);
  const setXP = useUser((state) => state.setXP);

  useEffect(() => {
    if (postureData.length % 5 === 0) {
      if (userHP > 0 && currentPosture === "good") {
        setXP((prevXP) => prevXP + 10);
      }
    }
  }, [postureData.length, userHP, currentPosture, setXP]);

  return null;
};

export default XPSystem;
