import { bfs } from "./bfs";
import { dfs } from "./dfs";

export const algos = {
  bfs,
  dfs,
};

export type AlgoName = keyof typeof algos;
