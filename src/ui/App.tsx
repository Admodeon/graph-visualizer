import { useEffect, useMemo, useRef, useState } from "react";
import cytoscape, { type Core } from "cytoscape";

import "./App.css";
import { sampleGraph } from "../data/sampleGraph";
import { bfs } from "../algo/bfs";
import { useRunner } from "../hooks/useRunner";
import { ControlPanel } from "./ControlPanels";

function App() {
  const cyRef = useRef<Core | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 1. BFS calculé une seule fois
  const steps = useMemo(() => {
    return bfs(sampleGraph, "A");
  }, []);

  // 2. init Cytoscape UNE seule fois
  useEffect(() => {
    const cyInstance = cytoscape({
      container: document.getElementById("cy") as HTMLElement,

      elements: [
        ...sampleGraph.nodes.map((n) => ({
          data: { id: n },
        })),
        ...sampleGraph.edges.map((e) => ({
          data: {
            source: e.from,
            target: e.to,
          },
        })),
      ],

      style: [
        {
          selector: "node",
          style: {
            label: "data(id)",
            "background-color": "#4a90e2",
            color: "#fff",
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#666",
          },
        },
        {
          selector: ".visited",
          style: {
            "background-color": "#4caf50",
          },
        },
        {
          selector: ".current",
          style: {
            "background-color": "#ff4d4d",
          },
        },
        {
          selector: ".queued",
          style: {
            "background-color": "#4da6ff",
          },
        },
      ],

      layout: {
        name: "cose",
        fit: true,
        padding: 50,
      },
    });

    cyRef.current = cyInstance;
    setIsReady(true);

    setTimeout(() => {
      cyInstance.resize();
      cyInstance.fit();
      cyInstance.center();
    }, 0);

    return () => {
      cyInstance.destroy();
      cyRef.current = null;
    };
  }, []);

  // 3. runner branché seulement quand prêt
  const { play, step, reset } = useRunner(
    steps,
    isReady ? cyRef.current : null
  );

  return (
    <>
      <div id="cy" className="graph-container" />

      <ControlPanel onPlay={() => play(400)} onStep={step} onReset={reset} />
    </>
  );
}

export default App;
