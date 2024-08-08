import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { TrackingModeType, UserType } from "@interfaces/user.types";
import { PostureStatus } from "@src/interfaces/posture.types";
import { SessionStatesEnum } from "@src/interfaces/session.types";

type UserState = {
  isSetupComplete: boolean;
  completeSetup: () => void;

  isTrackingEnabled: boolean;
  setTrackingEnabled: (value: boolean) => void;

  currentPosture: PostureStatus;
  setCurrentPosture: (value: PostureStatus) => void;

  postureData: Array<{ status: PostureStatus; date: Date; score: number }>;
  preparePostureData: () => Array<{
    status: PostureStatus;
    date: Date;
    score: number;
  }>;

  sessionPostureData: Array<{ status: PostureStatus; date: Date }>;
  prepareSessionPostureData: () => Array<{ status: PostureStatus; date: Date }>;

  isAuth: boolean;
  isGuest: boolean;
  user: UserType;
  greeting: () => string;
  setAuth: (isAuth: boolean, user?: UserType) => void;
  setGuest: (isGuest: boolean) => void;
  setDailyGoal: (newDailyGoal: number) => void;
  setPreferredMode: (newPreferredMode: TrackingModeType) => void;
  setLevel: (newLevel: number) => void;
  setXP: (newXP: number | ((prevXP: number) => number)) => void;
  setHP: (newHP: number | ((prevHP: number) => number)) => void;
  setDailyStreakCounter: (
    newDailyStreakCounter:
      | number
      | ((prevDailyStreakCounter: number) => number),
  ) => void;
  mode: TrackingModeType;
  changeMode: (value: TrackingModeType) => void;

  sessionStatus: `${SessionStatesEnum}`;
  setSessionStatus: (status: `${SessionStatesEnum}`) => void;

  setBadge: (badge: { id: number; date: string }) => void;

  // Active monitoring times
  timeStart: Date | null;
  setTimeStart: (date: Date | null) => void;
  timeEnd: Date | null;
  setTimeEnd: (date: Date | null) => void;
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
  badges: [],
  avatar_bg: "gray1",
  avatar_img: "Image01",
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
          const isSession = get().sessionStatus !== "INACTIVE";
          const user = get().user;

          if (value === "bad" || value === "good") {
            if (isSession) {
              // Session
              set((state) => ({
                currentPosture: value,
                sessionPostureData: [
                  ...state.sessionPostureData,
                  { status: value, date: new Date(), score: user.hp ?? 0 },
                ],
              }));
            } else {
              // Real-time tracking
              set((state) => ({
                currentPosture: value,
                postureData: [
                  ...state.postureData,
                  { status: value, date: new Date(), score: user.hp ?? 0 },
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
        setAuth: (isAuth: boolean, user?: UserType) => {
          if (isAuth) {
            set({
              isAuth: true,
              user,
              isSetupComplete: !!user?.isSetupComplete,
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
          //   .catch(console.log);
        },

        setPreferredMode: (newPreferredMode: TrackingModeType) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              preferredMode: newPreferredMode,
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
        setDailyStreakCounter: (
          newDailyStreakCounter:
            | number
            | ((prevDailyStreakCounter: number) => number),
        ) =>
          set((state: { isAuth: boolean; user: UserType }) => ({
            ...state,
            user: {
              ...state.user,
              dailyStreakCounter:
                typeof newDailyStreakCounter === "function"
                  ? newDailyStreakCounter(state.user.dailyStreakCounter)
                  : newDailyStreakCounter,
            },
          })),

        mode: "phone",
        changeMode: (value: TrackingModeType) => set({ mode: value }),

        sessionStatus: "INACTIVE",
        setSessionStatus: (sessionStatus: `${SessionStatesEnum}`) =>
          set({ sessionStatus }),
        sessionPostureData: [],
        prepareSessionPostureData: () => {
          // This function will get the current posture data that is ready to be sent to the api
          // we clear the object to avoid duplicity
          const data = get().sessionPostureData;
          set({ sessionPostureData: [] });
          return data;
        },

        setBadge: (badge) => {
          const badges = get().user.badges;
          const existing = badges.find((b) => badge.id == b.id);
          if (!existing) {
            set((state) => ({
              ...state,
              user: {
                ...state.user,
                badges: [...(state.user.badges || []), badge],
              },
            }));
          }
        },

        timeStart: null,
        setTimeStart: (date: Date | null) => set({ timeStart: date }),
        timeEnd: null,
        setTimeEnd: (date: Date | null) => set({ timeEnd: date }),
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      },
    ),
  ),
);
