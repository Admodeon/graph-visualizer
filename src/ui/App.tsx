import { useEffect, useMemo, useRef, useState } from "react";
import cytoscape, { type Core } from "cytoscape";

import "./App.css";
import { sampleGraph } from "../data/sampleGraph";
import { algos } from "../algo";
import type { AlgoName } from "../algo";
import { useRunner } from "../hooks/useRunner";
import { ControlPanel } from "./ControlPanels";

function App() {
  const cyRef = useRef<Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [algo, setAlgo] = useState<AlgoName>("bfs");

  // 1. génération des steps selon l'algo sélectionné
  const steps = useMemo(() => {
    return algos[algo](sampleGraph, "A");
  }, [algo]);

  // 2. init cytoscape une seule fois
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
            "text-valign": "center",
            "text-halign": "center",
            width: 34,
            height: 34,
            "font-size": "12px",
            color: "#fff",
            "background-color": "#4a90e2",
            "border-width": 2,
            "border-color": "#111",
          },
        },

        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#555",
            "curve-style": "bezier",
          },
        },

        {
          selector: ".current",
          style: {
            "background-color": "#ff4d4d",
            width: 42,
            height: 42,
          },
        },

        {
          selector: ".visited",
          style: {
            "background-color": "#2ecc71",
          },
        },

        {
          selector: ".queued",
          style: {
            "background-color": "#3498db",
          },
        },

        {
          selector: ".active-edge",
          style: {
            "line-color": "#ffffff",
            width: 4,
          },
        },
      ],

      layout: {
        name: "breadthfirst",
        directed: true,
        padding: 40,
        spacingFactor: 1.2,
      },
    });

    cyRef.current = cyInstance;
    setIsReady(true);

    // fit propre
    setTimeout(() => {
      cyInstance.fit();
      cyInstance.center();
    }, 0);

    return () => {
      cyInstance.destroy();
      cyRef.current = null;
    };
  }, []);

  // 3. runner
  const { play, step, reset } = useRunner(
    steps,
    isReady ? cyRef.current : null
  );

  // reset automatique quand on change d'algo
  useEffect(() => {
    reset();
  }, [algo]);

  return (
    <div className="app">
      <div ref={containerRef} id="cy" className="graph" />

      <ControlPanel
        algo={algo}
        onAlgoChange={setAlgo}
        onPlay={() => play(400)}
        onStep={step}
        onReset={reset}
      />
    </div>
  );
}

export default App;
