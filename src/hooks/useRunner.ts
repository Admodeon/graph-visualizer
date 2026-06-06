import { useEffect, useRef } from "react";
import type { Step } from "../engine/types";
import { Runner } from "../engine/runner";
import type { Core } from "cytoscape";

export function useRunner(steps: Step[], cy: Core | null) {
  const runnerRef = useRef<Runner | null>(null);

  useEffect(() => {
    runnerRef.current = new Runner(steps);
  }, [steps]);

  const applyStep = (step: Step) => {
    if (!cy) return;

    switch (step.type) {
      case "start":
        cy.nodes().removeClass("current visited queued");
        cy.$id(step.node).addClass("current");
        break;

      case "current":
        cy.nodes().removeClass("current");
        cy.$id(step.node).addClass("current");
        break;

      case "visit":
        cy.$id(step.node).removeClass("current queued").addClass("visited");
        break;

      case "enqueue":
        cy.$id(step.node).addClass("queued");
        break;

      case "done":
        cy.nodes().removeClass("current");
        break;
    }
  };
  return {
    runner: () => runnerRef.current,

    play: (speed = 500) => {
      runnerRef.current?.play(speed, applyStep);
    },

    step: () => {
      const s = runnerRef.current?.next();
      if (s) applyStep(s);
    },

    reset: () => {
      runnerRef.current?.reset();
      cy?.nodes().removeClass("current visited queued");
    },
  };
}
