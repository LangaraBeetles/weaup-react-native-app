import { persist, createJSONStorage, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import formatCalendarDay from "@src/utils/format-calendar-day";

dayjs.extend(calendar);

const today = dayjs();

const getDisplayDate = (currentFilter: [string, string]) => {
  if (!currentFilter) {
    return null;
  }

  const isSameDate = dayjs(currentFilter[0]).isSame(currentFilter[1], "date");

  if (isSameDate) {
    return formatCalendarDay(currentFilter[0]);
  }

  if (
    dayjs(currentFilter[0]).isSame(today.startOf("week"), "date") &&
    dayjs(currentFilter[1]).isSame(today.endOf("week"), "date")
  ) {
    return "This Week";
  }

  if (
    dayjs(currentFilter[0]).isSame(today.startOf("month"), "date") &&
    dayjs(currentFilter[1]).isSame(today.endOf("month"), "date")
  ) {
    return "This Month";
  }

  return `${formatCalendarDay(currentFilter[0], "short")} - ${formatCalendarDay(currentFilter[1], "short")}`;
};

export const useAnalyticsFilter = create<{
  day: [string, string];
  week: [string, string];
  month: [string, string];
  isSame: (term: "day" | "week" | "month") => boolean;
  displayDate: (term: "day" | "week" | "month") => string | null;

  getDates: (term: "day" | "week" | "month") => [string, string];
  setDates: (
    term: "day" | "week" | "month",
    direction: "forward" | "backwards",
  ) => void;
}>()(
  devtools(
    persist(
      (set, get) => ({
        isSame: (term) => {
          const prev = get()[term];

          return dayjs(prev[0]).isSame(today, term);
        },
        displayDate: (term) => {
          const prev = get()[term];

          return getDisplayDate(prev);
        },
        day: [
          dayjs(today).startOf("day").format(),
          dayjs(today).endOf("day").format(),
        ],
        week: [
          dayjs(today).startOf("week").format(),
          dayjs(today).endOf("week").format(),
        ],
        month: [
          dayjs(today).startOf("month").format(),
          dayjs(today).endOf("month").format(),
        ],
        getDates: (term) => {
          return get()[term];
        },
        setDates: (term, direction) => {
          const quantity = direction === "forward" ? 1 : -1;
          const prev = get()[term];

          const startDate = dayjs(prev[0]).add(quantity, term);
          const endDate = dayjs(startDate).endOf(term);
          set({ [term]: [startDate.format(), endDate.format()] });
        },
      }),
      {
        storage: createJSONStorage(() => AsyncStorage),
        name: "user-db",
      },
    ),
  ),
);
