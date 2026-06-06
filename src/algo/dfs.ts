import type { Graph } from "../core/graph";
import type { Step } from "../engine/types";

export function dfs(graph: Graph, start: string): Step[] {
  const steps: Step[] = [];

  const visited = new Set<string>();
  const stack: string[] = [start];

  steps.push({ type: "start", node: start });

  while (stack.length > 0) {
    const current = stack.pop()!;

    if (visited.has(current)) continue;

    steps.push({ type: "current", node: current });

    visited.add(current);

    steps.push({ type: "visit", node: current });

    const neighbors = graph.edges
      .filter((e) => e.from === current)
      .map((e) => e.to);

    // ordre inversé pour conserver un parcours gauche → droite
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];

      if (!visited.has(neighbor)) {
        steps.push({
          type: "edge",
          from: current,
          to: neighbor,
        });

        stack.push(neighbor);

        steps.push({
          type: "enqueue",
          node: neighbor,
        });
      }
    }

    steps.push({
      type: "queue",
      queue: [...stack],
    });
  }

  steps.push({ type: "done" });

  return steps;
}
