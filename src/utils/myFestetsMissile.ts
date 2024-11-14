import { RoketType } from "../compomnets/pages/Page";
import { misslilesNameSpeed } from "./rocketSpeed";

interface Misslie {
  name: string;
  speed: number;
}
export const myFastmissle = (list: RoketType[]) => {
  const myMisslesName = list.filter((x) => x.amount > 0).map((x) => x.name);
  const copy = misslilesNameSpeed;
  const myMisslesWithSpeed = copy
    .filter((c) => myMisslesName.includes(c.name))
    .map((x) => x.speed);
  return Math.min(...myMisslesWithSpeed);
};

export const lasyMissile = (list: RoketType[]) => {
  const myMisslesName = list.filter((x) => x.amount > 0).map((x) => x.name);
  const copy = misslilesNameSpeed;
  const myMisslesWithSpeed = copy.filter((c) => myMisslesName.includes(c.name));
//   const onlySpeed = misslilesNameSpeed.map((x) => x.speed);
//   const mini = Math.max(...onlySpeed);
  const minMissile = myMisslesWithSpeed.reduce(
    (mini: any, curr) => (curr.speed < mini.speed ? (mini = curr) : mini));
  return minMissile;
};
