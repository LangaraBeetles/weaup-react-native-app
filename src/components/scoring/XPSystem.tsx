import { useEffect } from "react";
import { useUser } from "@src/state/useUser";

const XPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const currentPosture = "good"; //TODO: use currentPosture from user state
  const setXP = useUser((state) => state.setXP);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userHP > 0 && currentPosture === "good") {
        setXP((prevXP) => prevXP + 10);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPosture, userHP, setXP]);

  return null;
};

export default XPSystem;
