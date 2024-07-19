import api from "../../services/api";
import { useUser } from "@src/state/useUser";
import { TrackingModeType, UserAvatar, UserType } from "@interfaces/user.types";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { UserBadgeType } from "@src/interfaces/badges.types";
import { getUserById } from "@src/services/userApi";

export type AuthUserResponse = {
  _id: string;
  name: string;
  email: string | null;
  preferred_mode: TrackingModeType;
  daily_goal: number;
  level: number;
  is_setup_complete: boolean;
  xp: number;
  hp: number;
  device_id: string;
  provider_id: string;
  token: string;
  daily_streak_counter: number;
  badges: UserBadgeType[];
  avatar_bg: UserAvatar;
};

const useAuth = () => {
  const { setAuth, setGuest, user } = useUser();
  const navigation = useNavigation();

  const handleGoogleAuthCallback = async (
    params: AuthUserResponse,
    onSuccess: () => void,
    onError: () => void,
  ) => {
    try {
      if (!params || !params._id || !params.token) {
        return;
      }

      const response = await getUserById(params._id);
      const badges = response.data.badges;

      const user: UserType = {
        id: params._id,
        deviceId: params.device_id,
        name: params.name || "",
        dailyGoal: Number(params.daily_goal) || 80,
        providerId: params.provider_id || "",
        level: params.level,
        xp: Number(params.xp) || 0,
        hp: Number(params.hp) || 100,
        email: params.email ?? "",
        isSetupComplete: true, //params.is_setup_complete, // TODO: Review why this values is undefined
        preferredMode: params.preferred_mode,
        avatar: params.avatar_bg,
        token: params.token,

        dailyStreakCounter: params.daily_streak_counter || 0,
        badges: badges || [],
      };

      setGuest(false);
      setAuth(true, user);
      onSuccess();
    } catch (error) {
      console.log("handleGoogleAuthCallback", { error });
      onError();
    }
  };

  const logout = async () => {
    await createGuestUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "index" }],
      }),
    );
  };

  const createGuestUser = async () => {
    const guestUser = {
      preferred_mode: user.preferredMode,
      daily_goal: user.dailyGoal,
      is_setup_complete: true,
    };

    try {
      const { data } = await api.post<{ data: AuthUserResponse }>(
        "/user",
        guestUser,
      );

      const createdUser = data.data;

      console.log("[USER] user created ", createdUser._id);
      const user: UserType = {
        id: createdUser._id,
        deviceId: createdUser.device_id,
        name: createdUser.name,
        dailyGoal: createdUser.daily_goal,
        providerId: createdUser.provider_id,
        level: createdUser.level,
        xp: createdUser.xp,
        hp: createdUser.hp,
        token: createdUser.token,
        email: createdUser.email ?? "",
        preferredMode: createdUser.preferred_mode,
        isSetupComplete: createdUser.is_setup_complete,
        dailyStreakCounter: 0,
        avatar: createdUser.avatar_bg,
        badges: [],
      };

      setGuest(true);
      setAuth(true, user);

      return user;
    } catch (error) {
      console.error("Error creating guest user", error);
    }
  };

  return { handleGoogleAuthCallback, logout, createGuestUser };
};

export default useAuth;
