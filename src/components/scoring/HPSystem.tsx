import { useUser } from "@src/state/useUser";

const HPSystem = ({ currentPosture }: { currentPosture: string }) => {
  const userHP = useUser((state) => state.user.hp);
  const setHP = useUser((state) => state.setHP);

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
};

export default HPSystem;
