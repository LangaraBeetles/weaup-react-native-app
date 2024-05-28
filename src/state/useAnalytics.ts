import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AnalyticsState = {};

export const useAnalytics = create<AnalyticsState>()(
  devtools(
    persist(
      (set, get) => ({
        //...
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "analytics-db",
      }
    )
  )
);
