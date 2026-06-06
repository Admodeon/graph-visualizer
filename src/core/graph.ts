export type NodeId = string;

export type Edge = {
  from: NodeId;
  to: NodeId;
  weight?: number;
};

export type Graph = {
  nodes: NodeId[];
  edges: Edge[];
};
