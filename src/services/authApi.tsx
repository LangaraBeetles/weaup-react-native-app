import api from "./api";
import { useUser } from "@src/state/useUser";
import { UserType } from "@interfaces/user.types";
import { useNavigation, CommonActions } from "@react-navigation/native";

const useAuthApi = () => {
  const { setAuth, setGuest } = useUser();
  const navigation = useNavigation();

  const handleGoogleAuthCallback = (params: any) => {
    if (!params || !params._id || !params.token) {
      return;
    }

    const user: UserType = {
      id: params._id,
      deviceIds: [params.device_id].filter(Boolean) as string[],
      currentDeviceId: params.device_id || null,
      name: params.name || "",
      dailyGoal: Number(params.daily_goal) || 80,
      providerId: params.providerId || "",
      level: 1,
      xp: Number(params.xp) || 0,
      hp: Number(params.hp) || 100,
      daily_streak_counter: 0,
      token: params.token,
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
      providerId: "",
      name: "Guest",
      email: "",
      preferred_mode: "phone",
      daily_goal: 50,
      level_id: null,
      is_setup_complete: false,
      xp: 0,
      hp: 100,
      device_id: null,
    };

    try {
      const response = await api.post("/user", guestUser);
      const createdUser = response.data;

      const user: UserType = {
        id: createdUser._id,
        deviceIds: [createdUser.device_id].filter(Boolean) as string[],
        currentDeviceId: createdUser.device_id || null,
        name: createdUser.name,
        dailyGoal: createdUser.daily_goal,
        providerId: createdUser.providerId,
        level: 1,
        xp: createdUser.xp,
        hp: createdUser.hp,
        daily_streak_counter: 0,
        token: "",
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

export default useAuthApi;
