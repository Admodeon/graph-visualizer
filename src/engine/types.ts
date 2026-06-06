import { type Graph } from "../core/graph";
import { Step } from "./types";

export type AlgoName = "bfs" | "dfs" | "dijkstra";

export type Step =
  | { type: "start"; node: string }
  | { type: "visit"; node: string }
  | { type: "enqueue"; node: string }
  | { type: "done" };

export type AlgoFunction = (graph: Graph, start: string) => Step[];
