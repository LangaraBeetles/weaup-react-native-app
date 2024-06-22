import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { UserType } from "@interfaces/user.types";

type UserState = {
  isSetupComplete: boolean;
  completeSetup: () => void;

  isAuth: boolean;
  user: UserType;
  greeting: () => string;
  setAuth: (isAuth: boolean, user: UserType) => void;
  setDailyGoal: (newDailyGoal: number) => void;

  setLevel: (newLevel: number) => void;
  setXP: (newXP: number | ((prevXP: number) => number)) => void;
  setHP: (newHP: number | ((prevHP: number) => number)) => void;
  setDailyStreakCounter: (newDailyStreakCounter: number) => void;
};

const userInitialState: UserType = {
  deviceIds: [],
  currentDeviceId: null,
  name: "",
  dailyGoal: 80, // out of 100
  providerId: "",
  level: 1,
  xp: 0,
  hp: 100,
  daily_streak_counter: 0,
};

// Clear AsyncStorage:
// AsyncStorage.clear();

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
        setLevel: (newLevel: number) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              level: newLevel,
            },
          })),
        setXP: (newXP: number | ((prevXP: number) => number)) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              xp: typeof newXP === "function" ? newXP(state.user.xp) : newXP,
            },
          })),
        setHP: (newHP: number | ((prevHP: number) => number)) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              hp: typeof newHP === "function" ? newHP(state.user.hp) : newHP,
            },
          })),
        setDailyStreakCounter: (newDailyStreakCounter: number) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              daily_streak_counter: newDailyStreakCounter,
            },
          })),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      },
    ),
  ),
);
