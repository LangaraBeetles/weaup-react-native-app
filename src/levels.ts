import { LevelType } from "./interfaces/level.types";

//TODO: adjust level values
const levels: LevelType[] = [
  // { level: 1, xp: 1000 },
  // { level: 2, xp: 2000 },
  // { level: 3, xp: 4000 },
  // { level: 4, xp: 5000 },
  // { level: 5, xp: 18000 },
  // { level: 6, xp: 37000 },
  ...new Array(100).fill({}).map((_, index) => {
    const level = index + 1;
    return { level: level, xp: level * 100 };
  }),
];

export default levels;
