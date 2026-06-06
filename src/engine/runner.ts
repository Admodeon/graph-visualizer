import type { Step } from "./types";

export class Runner {
  private steps: Step[];
  private index = 0;

  private intervalId: number | null = null;
  private isPlaying = false;

  constructor(steps: Step[]) {
    this.steps = steps;
  }

  // -------------------
  // CORE
  // -------------------

  hasNext(): boolean {
    return this.index < this.steps.length;
  }

  next(): Step | null {
    if (!this.hasNext()) return null;
    return this.steps[this.index++];
  }

  current(): Step | null {
    if (this.index === 0 || this.index > this.steps.length) return null;
    return this.steps[this.index - 1];
  }

  reset(): void {
    this.stop();
    this.index = 0;
  }

  getProgress(): number {
    return this.steps.length === 0 ? 1 : this.index / this.steps.length;
  }

  // -------------------
  // PLAY CONTROL
  // -------------------

  play(speed = 500, onStep?: (step: Step) => void): void {
    if (this.isPlaying) return;

    this.isPlaying = true;

    this.intervalId = window.setInterval(() => {
      const step = this.next();

      if (!step) {
        this.stop();
        return;
      }

      if (onStep) onStep(step);
    }, speed);
  }

  pause(): void {
    this.stop();
  }

  private stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  // -------------------
  // DEBUG
  // -------------------

  getAll(): Step[] {
    return this.steps;
  }

  isRunning(): boolean {
    return this.isPlaying;
  }
}
