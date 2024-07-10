import dayjs from "dayjs";

const isChallengeActive = (endDate: string) => {
  try {
    const diff = dayjs(endDate).diff(dayjs(), "days");

    return { diff, isOngoing: diff >= 0 };
  } catch (error) {
    return { diff: -1, isOngoing: false };
  }
};

export default isChallengeActive;
