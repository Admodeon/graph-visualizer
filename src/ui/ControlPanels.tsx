type Props = {
  onPlay: () => void;
  onStep: () => void;
  onReset: () => void;
};

export function ControlPanel({ onPlay, onStep, onReset }: Props) {
  return (
    <div style={styles.panel}>
      <button onClick={onPlay}>Play</button>
      <button onClick={onStep}>Step</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "absolute",
    top: 10,
    left: 10,
    display: "flex",
    gap: 10,
    zIndex: 10,
    padding: 10,
    background: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: 8,
  },
};
