import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { TrackingModeType, UserType } from "@interfaces/user.types";
import { PostureStatus } from "@src/interfaces/posture.types";

type UserState = {
  isSetupComplete: boolean;
  completeSetup: () => void;

  isTrackingEnabled: boolean;
  setTrackingEnabled: (value: boolean) => void;

  currentPosture: PostureStatus;
  setCurrentPosture: (value: PostureStatus) => void;

  postureData: Array<{ status: PostureStatus; date: Date }>;
  preparePostureData: () => Array<{ status: PostureStatus; date: Date }>;

  isAuth: boolean;
  isGuest: boolean;
  user: UserType;
  greeting: () => string;
  setAuth: (isAuth: boolean, user: UserType) => void;
  setGuest: (isGuest: boolean) => void;
  setDailyGoal: (newDailyGoal: number) => void;

  setLevel: (newLevel: number) => void;
  setXP: (newXP: number | ((prevXP: number) => number)) => void;
  setHP: (newHP: number | ((prevHP: number) => number)) => void;
  setDailyStreakCounter: (newDailyStreakCounter: number) => void;
  mode: TrackingModeType;
  changeMode: (value: TrackingModeType) => void;

  isSessionActive: boolean;
  setSessionActive: (isActive: boolean) => void;
};

const userInitialState: UserType = {
  id: "",
  deviceId: "",
  name: "",
  dailyGoal: 80, // out of 100
  providerId: "",
  level: 1,
  xp: 0,
  hp: 100,
  dailyStreakCounter: 0,
  token: "",
  email: "",
  preferredMode: "phone",
  isSetupComplete: false,
};

// Clear AsyncStorage:
// AsyncStorage.clear();

export const useUser = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        isSetupComplete: false,
        completeSetup: () => set({ isSetupComplete: true }),

        isTrackingEnabled: false,
        setTrackingEnabled: (enabled) => set({ isTrackingEnabled: enabled }),

        currentPosture: "not_reading",
        setCurrentPosture: (value) => {
          const isSession = get().isSessionActive;

          if (value === "bad" || value === "good") {
            if (!isSession) {
              set((state) => ({
                currentPosture: value,
                postureData: [
                  ...state.postureData,
                  { status: value, date: new Date() },
                ],
              }));
            }
          } else {
            set({ currentPosture: value });
          }
        },

        postureData: [],

        preparePostureData: () => {
          // This function will get the current posture data that is ready to be sent to the api
          // we clear the object to avoid duplicity
          const data = get().postureData;
          set({ postureData: [] });
          return data;
        },

        isAuth: false,
        isGuest: true,
        user: userInitialState,
        greeting: () => `Hello ${get().user.name}!`,
        setAuth: (isAuth: boolean, user: UserType) => {
          if (isAuth) {
            set({
              isAuth: true,
              user,
              isSetupComplete: !!user.isSetupComplete,
            });
          } else {
            set({
              isAuth: false,
              user: userInitialState,
              // isSetupComplete: false,
            });
          }
        },
        setGuest: (isGuest: boolean) => set({ isGuest }),
        setDailyGoal: (newDailyGoal: number) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              dailyGoal: newDailyGoal,
            },
          })),
        setLevel: (newLevel: number) => {
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              level: newLevel,
            },
          }));

          // TODO: authenticate guest user with an id for this to work:
          // const user_id = get().user.id;
          // const body = {
          //   level: newLevel,
          // };

          // TODO: replace this with the axios interceptor api
          // axios
          //   .patch(`http://10.0.0.201:3000/api/v1/user/${user_id}`, body)
          //   .catch(console.error);
        },
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

        mode: "phone",
        changeMode: (value: TrackingModeType) => set({ mode: value }),

        isSessionActive: false,
        setSessionActive: (isActive) => set({ isSessionActive: isActive }),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      },
    ),
  ),
);
