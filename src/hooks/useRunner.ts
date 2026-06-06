import { useEffect, useRef } from "react";
import type { Step } from "../engine/types";
import { Runner } from "../engine/runner";
import type { Core } from "cytoscape";

export function useRunner(steps: Step[], cy: Core | null) {
  const runnerRef = useRef<Runner | null>(null);
  const cyRef = useRef<Core | null>(null);

  // keep cy updated
  useEffect(() => {
    cyRef.current = cy;
  }, [cy]);

  useEffect(() => {
    runnerRef.current = new Runner(steps);
  }, [steps]);

  const applyStep = (step: Step) => {
    const cyInstance = cyRef.current;
    if (!cyInstance) return;

    switch (step.type) {
      case "start":
        cyInstance.nodes().removeClass("current visited queued");
        break;

      case "current":
        cyInstance.nodes().removeClass("current");
        cyInstance.$id(step.node).addClass("current");
        break;

      case "visit":
        cyInstance
          .$id(step.node)
          .removeClass("current queued")
          .addClass("visited");
        break;

      case "enqueue":
        cyInstance.$id(step.node).addClass("queued");
        break;

      case "edge": {
        cyInstance.edges().removeClass("active-edge");

        const edge = cyInstance
          .edges()
          .filter(
            (e) =>
              e.data("source") === step.from && e.data("target") === step.to
          );

        edge.addClass("active-edge");

        setTimeout(() => {
          edge.removeClass("active-edge");
        }, 300);

        break;
      }
      case "done":
        cyInstance.nodes().removeClass("current");
        cyInstance.edges().removeClass("active-edge");
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
      cyRef.current?.nodes().removeClass("current visited queued");
      cyRef.current?.edges().removeClass("active-edge");
    },
  };
}
