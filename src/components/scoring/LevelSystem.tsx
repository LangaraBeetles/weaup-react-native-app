import levels from "@src/levels";
import { useUser } from "@src/state/useUser";
import { useEffect } from "react";

const LevelSystem = () => {
  const userXP = useUser((state) => state.user.xp);
  const setLevel = useUser((state) => state.setLevel);

  useEffect(() => {
    const determineLevel = (xp: number) => {
      let currentLevel = 1;
      for (let i = 0; i < levels.length; i++) {
        if (xp >= levels[i].xp) {
          currentLevel = levels[i].level;
        } else {
          break;
        }
      }
      return currentLevel;
    };

    const newLevel = determineLevel(userXP);
    setLevel(newLevel);
  }, [userXP, setLevel]);

  return null;

  //TODO: save the Level to the databse when new level reached
};

export default LevelSystem;
