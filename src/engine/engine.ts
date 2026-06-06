import type { Graph } from "../core/graph";
import type { Step, AlgoName } from "./types";
import { bfs } from "../algo/bfs";

export function runAlgo(algo: AlgoName, graph: Graph, start: string): Step[] {
  switch (algo) {
    case "bfs":
      return bfs(graph, start);

    default:
      throw new Error(`Algo not implemented: ${algo}`);
  }
}
