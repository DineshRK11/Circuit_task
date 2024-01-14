import { create } from 'zustand';
import {createWithEqualityFn} from "zustand/traditional"
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from './nodes';
import initialEdges from './edges';

const useStore = createWithEqualityFn((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (dataNode,dataEdge) =>{
  set((state) => ({
    nodes: [
          ...state.nodes,
          dataNode,
      ],
      edges:[
        ...state.edges,
        dataEdge,

      ]
  }))

},
}));

export default useStore;