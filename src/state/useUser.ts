import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { TrackingModeType, UserType } from "@interfaces/user.types";

type UserState = {
  isSetupComplete: boolean;
  completeSetup: () => void;

  isAuth: boolean;
  user: UserType;
  greeting: () => string;
  setAuth: (isAuth: boolean, user: UserType) => void;
  setDailyGoal: (newDailyGoal: number) => void;

  mode: TrackingModeType;
  changeMode: (value: TrackingModeType) => void;
};

const userInitialState: UserType = {
  deviceIds: [],
  currentDeviceId: null,
  name: "",
  dailyGoal: 80, // out of 100
  providerId: "",
};

export const useUser = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        isSetupComplete: false,
        completeSetup: () => set({ isSetupComplete: true }),
        isAuth: false,
        user: userInitialState,
        greeting: () => `Hello ${get().user.name}!`,
        setAuth: (isAuth: boolean, user: UserType) =>
          isAuth
            ? set({ isAuth: true, user })
            : set({
                isAuth: false,
                user: userInitialState,
                isSetupComplete: false,
                // TODO: temporarily setting this to false
              }),
        setDailyGoal: (newDailyGoal: number) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              dailyGoal: newDailyGoal,
            },
          })),

        mode: "PHONE",
        changeMode: (value: TrackingModeType) => set({ mode: value }),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      },
    ),
  ),
);
