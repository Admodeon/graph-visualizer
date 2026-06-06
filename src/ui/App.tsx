import { useEffect } from "react";
import cytoscape from "cytoscape";
import "./App.css";

import { sampleGraph } from "../data/sampleGraph";

function App() {
  useEffect(() => {
    const container = document.getElementById("cy");

    if (!container) return;

    const cy = cytoscape({
      container,

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
            "line-color": "#999",
          },
        },
      ],

      layout: {
        name: "cose",
        fit: true,
      },
    });

    setTimeout(() => {
      cy.resize();

      cy.fit(undefined, 80);
      cy.center();
    }, 0);

    return () => {
      cy.destroy();
    };
  }, []);

  return <div id="cy" />;
}

export default App;
