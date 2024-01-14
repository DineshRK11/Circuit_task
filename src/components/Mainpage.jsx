import React from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from "reactflow";

import useStore from "../store/store";
import { shallow } from "zustand/shallow";
import "reactflow/dist/style.css";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const connectionLineStyle = { stroke: "white" };

const edgeOptions = {
  animated: true,
  style: {
    stroke: "white",
  },
};
export default function Mainpage() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  return (
    <Box
      sx={{
        width: {
         lg: "87.5vw",
         md:"80vw",
         sm:'70vw',
         xs:'85vw'
        },
        height: "70vh",
        marginLeft: {
          xs: "0rem",
          sm: "9rem",
          md: "9rem",
          lg: "9rem",
          xl: "3.5rem",
        },
        marginTop: "-5rem",
      }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // connectionLineStyle={connectionLineStyle}
          // defaultEdgeOptions={edgeOptions}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  );
}
