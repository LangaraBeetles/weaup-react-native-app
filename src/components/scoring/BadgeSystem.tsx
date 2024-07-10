import { updateUser } from "@src/services/userApi";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const BadgeSystem = () => {
  const router = useRouter();
  const user = useUser((state) => state.user);
  const setBadge = useUser((state) => state.setBadge);

  useEffect(() => {
    // Unlock badge with id 1 when userXP is greater than 1000
    if (user.xp >= 1000 && !user?.badges?.some((badge) => badge.id === 1)) {
      const newBadge = { id: 1, date: new Date().toISOString() };
      setBadge(newBadge);

      router.push({ pathname: "/earn-badge", params: { badgeId: 1 } });

      updateUser(user.id, {
        badges: [...(user?.badges || []), newBadge],
      })
        .then(() => {
          console.log("Badge saved");
        })
        .catch(() => {
          console.log("[ERROR] Badge not saved");
        });
    }

    // TODO: Add more badge conditions
  }, [user?.xp, user?.badges, setBadge]);

  return null;
};

export default BadgeSystem;
