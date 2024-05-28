import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type ChallengesState = {};

export const useChallenges = create<ChallengesState>()(
  devtools(
    persist(
      (set, get) => ({
        //...
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "challenges-db",
      }
    )
  )
);
