import { useUser } from "@src/state/useUser";

const XPSystem = () => {
  const userHP = useUser((state) => state.user.hp);

  if (userHP > 0) {
    //TODO: add +10XP every minute
  }
};

export default XPSystem;
