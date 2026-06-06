import type { AlgoName } from "../algo";

type Props = {
  value: AlgoName;
  onChange: (algo: AlgoName) => void;
};

export function AlgoSelector({ value, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={() => onChange("bfs")}
        style={{
          fontWeight: value === "bfs" ? "bold" : "normal",
        }}
      >
        BFS
      </button>

      <button
        onClick={() => onChange("dfs")}
        style={{
          fontWeight: value === "dfs" ? "bold" : "normal",
        }}
      >
        DFS
      </button>
    </div>
  );
}
