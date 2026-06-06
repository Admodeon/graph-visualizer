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
            "text-valign": "center",
            "text-halign": "center",

            width: 34,
            height: 34,

            "font-size": "12px",
            color: "#fff",

            "background-color": "#4a90e2",
            "border-width": 2,
            "border-color": "#0d0d0d",

            // smooth animation
            "transition-property":
              "background-color, border-color, width, height, box-shadow",
            "transition-duration": "250ms",
          },
        },

        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#555",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "#555",
            "curve-style": "bezier",

            "transition-property": "line-color, width",
            "transition-duration": "200ms",
          },
        },

        // 🔴 current node (glow)
        {
          selector: ".current",
          style: {
            "background-color": "#ff4d4d",
            width: 42,
            height: 42,

            "border-color": "#ff1a1a",

            "box-shadow": "0 0 20px #ff4d4d",
          },
        },

        // 🟢 visited
        {
          selector: ".visited",
          style: {
            "background-color": "#2ecc71",
            "border-color": "#145a32",
          },
        },

        // 🔵 queued
        {
          selector: ".queued",
          style: {
            "background-color": "#3498db",
            "border-color": "#1b4f72",
          },
        },

        // ✨ edge highlight (traversed)
        {
          selector: ".active-edge",
          style: {
            "line-color": "#ffffff",
            width: 4,
            "target-arrow-color": "#ffffff",
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
