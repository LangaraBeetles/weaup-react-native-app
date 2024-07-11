import levels from "@src/levels";
import { useUser } from "@src/state/useUser";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import NewLevelModal from "../modals/NewLevelModal";

type LevelSystemContextState = {
  unlockedLevels: Array<{ level: number }>;
  showLevelUpModal: () => void;
};

const LevelSystemContext = createContext<LevelSystemContextState | null>(null);

const LevelSystemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [unlockedLevels, setUnlockedLevels] = useState<
    Array<{ level: number }>
  >([]);
  const userXP = useUser((state) => state.user.xp);
  const userLevel = useUser((state) => state.user.level);
  const setUserLevel = useUser((state) => state.setLevel);
  const isSessionActive = useUser(
    (state) => state.sessionStatus !== "INACTIVE",
  );
  const isRealtimeTrackingEnabled = useUser((state) => state.isTrackingEnabled);

  const [levelUpAfterSession, setLevelUpAfterSession] = useState<{
    visible: boolean;
    level: number;
  }>();
  const [instantLevelUp, setInstantLevelUp] = useState<{
    visible: boolean;
    level: number;
  }>();

  const showLevelUp = useCallback(() => {
    const availableLevelUp = [...unlockedLevels].shift();
    if (!availableLevelUp) {
      return;
    }

    setLevelUpAfterSession({
      level: availableLevelUp?.level,
      visible: true,
    });
  }, [unlockedLevels]);

  const closeLevelUp = (level: number) => {
    setInstantLevelUp(undefined);
    setLevelUpAfterSession(undefined);
    setUserLevel(level);
    setUnlockedLevels((prev) => prev.filter((data) => data.level !== level));
    setTimeout(showLevelUp, 500);
  };

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

    console.log({ userXP });
    const newLevel = determineLevel(userXP);
    console.log({ newLevel });
    if (newLevel > userLevel) {
      if (isSessionActive) {
        setUnlockedLevels((prev) => [
          ...prev.filter(({ level }) => level !== newLevel),
          { level: newLevel },
        ]);
      } else if (isRealtimeTrackingEnabled) {
        setInstantLevelUp({
          level: newLevel,
          visible: true,
        });
      }
    }
  }, [userXP, isSessionActive, isRealtimeTrackingEnabled]);

  return (
    <LevelSystemContext.Provider
      value={{
        unlockedLevels,
        showLevelUpModal: showLevelUp,
      }}
    >
      {children}

      {levelUpAfterSession ? (
        <NewLevelModal
          level={levelUpAfterSession?.level}
          isVisible={!isSessionActive && levelUpAfterSession?.visible}
          onClose={closeLevelUp}
        />
      ) : null}

      {instantLevelUp ? (
        <NewLevelModal
          level={instantLevelUp?.level}
          isVisible={!isSessionActive && instantLevelUp?.visible}
          onClose={closeLevelUp}
        />
      ) : null}
    </LevelSystemContext.Provider>
  );
};

export default LevelSystemProvider;

export const useLevelSystem = () => {
  const context = useContext(LevelSystemContext);
  if (!context) {
    throw new Error(
      "You need to wrap the components with the LevelSystemProvider",
    );
  }
  return context;
};
