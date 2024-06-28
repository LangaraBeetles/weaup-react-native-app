import api from "../../services/api";
import { useUser } from "@src/state/useUser";
import { TrackingModeType, UserType } from "@interfaces/user.types";
import { useNavigation, CommonActions } from "@react-navigation/native";

type AuthUserResponse = {
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
};

const useAuth = () => {
  const { setAuth, setGuest, user } = useUser();
  const navigation = useNavigation();

  const handleGoogleAuthCallback = (params: AuthUserResponse) => {
    if (!params || !params._id || !params.token) {
      return;
    }

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

      token: params.token,

      // This field doesn't exist in the api
      dailyStreakCounter: 0,
    };

    setGuest(false);
    setAuth(true, user);
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
      preferred_mode: "phone", //user.preferredMode,
      daily_goal: user.dailyGoal,
      is_setup_complete: true,
    };

    try {
      const { data } = await api.post<{ data: AuthUserResponse }>(
        "/user",
        guestUser,
      );

      const createdUser = data.data;

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

        // This values is not in the api
        dailyStreakCounter: 0,
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
