import { type Graph } from "../core/graph";

export type AlgoName = "bfs";

export type Step =
  | { type: "start"; node: string }
  | { type: "current"; node: string }
  | { type: "visit"; node: string }
  | { type: "enqueue"; node: string }
  | { type: "queue"; queue: string[] }
  | { type: "edge"; from: string; to: string }
  | { type: "done" };
export type AlgoFunction = (graph: Graph, start: string) => Step[];
