import levels from "@src/levels";
import { useUser } from "@src/state/useUser";
import { useEffect, useState } from "react";
import NewLevelModal from "../modals/NewLevelModal";

const LevelSystem = () => {
  const userXP = useUser((state) => state.user.xp);
  const userLevel = useUser((state) => state.user.level);
  const setLevel = useUser((state) => state.setLevel);
  const isSessionActive = useUser(
    (state) => state.sessionStatus !== "INACTIVE",
  );
  const [levelModalVisible, setLevelModalVisible] = useState(false);

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
    if (newLevel > userLevel) {
      setLevel(newLevel);
      setLevelModalVisible(true);
    }
  }, [userXP, setLevel]);

  return (
    <NewLevelModal
      isVisible={!isSessionActive && levelModalVisible}
      onClose={() => setLevelModalVisible(false)}
    />
  );
};

export default LevelSystem;
