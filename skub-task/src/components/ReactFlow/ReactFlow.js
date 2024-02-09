import React from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';

import { initialNodes, initialEdges } from './nodes-edges.js';
import 'reactflow/dist/style.css';

// const getLayoutedElements = (nodes, edges) => {
//   return { nodes, edges };
// };

const LayoutFlow = () => {
  // const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <div style={{ height: '500px', width: '100%' }}>
        <h2>reactflow lib-1</h2>
        <LayoutFlow />
      </div>
    </ReactFlowProvider>
  );
}
