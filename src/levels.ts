import { LevelType } from "./interfaces/level.types";

//TODO: adjust level values
const levels: LevelType[] = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 400 },
  { level: 4, xp: 500 },
  { level: 5, xp: 1800 },
  { level: 6, xp: 3700 },
  // ...new Array(100).fill({}).map((_, index) => {
  //   const level = index + 1;
  //   return { level: level, xp: level * 100 };
  // }),
];

export default levels;
