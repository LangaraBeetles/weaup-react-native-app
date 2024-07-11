import { LevelType } from "./interfaces/level.types";

//TODO: adjust level values
const levels: LevelType[] = [
  // { level: 1, xp: 0 },
  // { level: 2, xp: 20 },
  // { level: 3, xp: 40 },
  // { level: 4, xp: 50 },
  // { level: 5, xp: 180 },
  // { level: 6, xp: 370 },
  ...new Array(100).fill({}).map((_, index) => {
    const level = index + 1;
    return { level: level, xp: level * 100 };
  }),
];

// console.log({ levels });

export default levels;
