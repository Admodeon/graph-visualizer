import type { Graph } from "../core/graph";
import type { Step } from "../engine/types";

export function bfs(graph: Graph, start: string): Step[] {
  const steps: Step[] = [];

  const visited = new Set<string>();
  const queue: string[] = [start];

  steps.push({ type: "start", node: start });

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (visited.has(current)) continue;

    visited.add(current);

    steps.push({ type: "visit", node: current });

    // récupérer voisins
    const neighbors = graph.edges
      .filter((e) => e.from === current)
      .map((e) => e.to);

    for (const n of neighbors) {
      if (!visited.has(n)) {
        queue.push(n);
      }
    }

    steps.push({ type: "queue", queue: [...queue] });
  }

  steps.push({ type: "done" });

  return steps;
}
