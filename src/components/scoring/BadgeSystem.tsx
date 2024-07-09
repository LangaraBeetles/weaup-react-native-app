import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const BadgeSystem = () => {
  const router = useRouter();
  const userBadges = useUser((state) => state.user.badges);
  const setBadge = useUser((state) => state.setBadge);
  const userXP = useUser((state) => state.user.xp);

  useEffect(() => {
    if (userXP >= 1000 && !userBadges?.some((badge) => badge.id === 1)) {
      // Unlock badge with id 1 when userXP is greater than 1000
      setBadge({ id: 1, date: new Date().toISOString() });
      // TODO: Redirect to badge unlocked screen
      router.push("/session-summary");
    }
  }, [userXP, userBadges, setBadge]);

  return null;
};

export default BadgeSystem;
