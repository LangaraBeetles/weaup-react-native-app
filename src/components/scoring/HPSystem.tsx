import { useUser } from "@src/state/useUser";
import { useEffect } from "react";

const HPSystem = () => {
  const userHP = useUser((state) => state.user.hp);
  const setHP = useUser((state) => state.setHP);
  const currentPosture = useUser((state) => state.currentPosture);
  const postureData = useUser((state) => state.postureData);

  useEffect(() => {
    if (userHP >= 0 && userHP <= 100) {
      if (currentPosture === "bad") {
        if (userHP - 1 < 0) {
          setHP(0);
        } else {
          setHP(userHP - 1);
        }
      }
      if (currentPosture === "good") {
        if (userHP + 1 > 100) {
          setHP(100);
        } else {
          setHP(userHP + 1);
        }
      }
    }

    return;
  }, [currentPosture, postureData.length]);

  return null;

  //TODO: save the HP to the database every 1 min if it has changed in the last minute
};

export default HPSystem;
