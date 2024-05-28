import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { UserType } from "@interfaces/user.types";

type UserState = {
  isAuth: boolean;
  user: UserType;
  greeting: () => string;
  setAuth: (isAuth: boolean, user: UserType) => void;
  setDailyGoal: (newDailyGoal: number) => void;
};

const userInitialState: UserType = {
  deviceIds: [],
  currentDeviceId: null,
  name: "",
  dailyGoal: 80, // out of 100
};

export const useUser = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuth: false,
        user: userInitialState,
        greeting: () => `Hello ${get().user.name}!`,
        setAuth: (isAuth: boolean, user: UserType) =>
          isAuth
            ? set({ isAuth: true, user })
            : set({ isAuth: false, user: userInitialState }),
        setDailyGoal: (newDailyGoal: number) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              dailyGoal: newDailyGoal,
            },
          })),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      }
    )
  )
);
