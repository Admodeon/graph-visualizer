import { AlgoSelector } from "./AlgoSelector";
import type { AlgoName } from "../algo";

export function ControlPanel({ algo, onAlgoChange, onPlay, onStep, onReset }) {
  return (
    <div className="control-panel">
      <button onClick={() => onAlgoChange("bfs")}>
        BFS {algo === "bfs" ? "✓" : ""}
      </button>

      <button onClick={() => onAlgoChange("dfs")}>
        DFS {algo === "dfs" ? "✓" : ""}
      </button>

      <button onClick={onPlay}>Play</button>
      <button onClick={onStep}>Step</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
