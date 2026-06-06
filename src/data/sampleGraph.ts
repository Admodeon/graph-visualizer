export const sampleGraph = {
  nodes: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
  ],

  edges: [
    // cluster 1 (A - E)
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "D", to: "E" },
    { from: "E", to: "A" }, // cycle

    // cluster 2 (F - J)
    { from: "F", to: "G" },
    { from: "F", to: "H" },
    { from: "G", to: "I" },
    { from: "H", to: "I" },
    { from: "I", to: "J" },
    { from: "J", to: "F" }, // cycle

    // bridge entre clusters
    { from: "E", to: "F" },
    { from: "D", to: "G" },

    // cluster 3 (K - O)
    { from: "K", to: "L" },
    { from: "K", to: "M" },
    { from: "L", to: "N" },
    { from: "M", to: "N" },
    { from: "N", to: "O" },
    { from: "O", to: "K" }, // cycle

    // connexions inter cluster
    { from: "J", to: "K" },
    { from: "H", to: "L" },

    // cluster 4 (P - T)
    { from: "P", to: "Q" },
    { from: "P", to: "R" },
    { from: "Q", to: "S" },
    { from: "R", to: "S" },
    { from: "S", to: "T" },
    { from: "T", to: "P" }, // cycle

    // liens globaux
    { from: "O", to: "P" },
    { from: "N", to: "Q" },
    { from: "M", to: "R" },
  ],
};
