import { useEffect } from "react";
import { useUser } from "@src/state/useUser";

const XPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const currentPosture = useUser((state) => state.currentPosture);
  const setXP = useUser((state) => state.setXP);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userHP > 0 && currentPosture === "good") {
        setXP((prevXP) => prevXP + 10);
      }
    }, 5000); //TODO: adjust time

    return () => {
      clearInterval(interval);
    };
  }, [currentPosture, setXP]);

  return null;
};

export default XPSystem;
