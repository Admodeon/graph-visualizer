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
  ],

  edges: [
    // root
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "A", to: "D" },

    // level 1
    { from: "B", to: "E" },
    { from: "B", to: "F" },

    { from: "C", to: "G" },
    { from: "C", to: "H" },

    { from: "D", to: "I" },
    { from: "D", to: "J" },

    // level 2
    { from: "E", to: "K" },
    { from: "E", to: "L" },

    { from: "F", to: "M" },
    { from: "F", to: "N" },

    { from: "G", to: "O" },
    { from: "H", to: "P" },
  ],
};
