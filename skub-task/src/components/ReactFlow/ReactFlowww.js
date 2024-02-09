import React from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

class OverviewFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNodeId: null,
      nodes: initialNodes,
      edges: initialEdges,
    };
  }

  onConnect = (params) => {
    this.setState((prevState) => ({
      edges: addEdge(params, prevState.edges),
    }));
  };

  handleNodeClick = (event, node) => {
    console.log('Custom node clicked:', node.id);
  };

  handleNodeMouseEnter = (event, node) => {
    console.log('Node mouse enter');
  };

  handleNodeMouseLeave = () => {
    console.log('Node mouse leave');
  };

  render() {
    const { nodes, edges } = this.state;

    const edgesWithUpdatedTypes = edges.map((edge) => {
      if (edge.sourceHandle) {
        const edgeType = nodes.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
        edge.type = edgeType;
      }
      return edge;
    });

    return (
      <div style={{ height: '630px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edgesWithUpdatedTypes}
          // elements={[...nodes, ...edgesWithUpdatedTypes]}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          onConnect={this.onConnect}
          
          onNodeClick={this.handleNodeClick}
          onNodeMouseEnter={this.handleNodeMouseEnter}
          onNodeMouseLeave={this.handleNodeMouseLeave}
        >
          <MiniMap style={minimapStyle} zoomable pannable />
          <Controls />
          {/* <Background color="#aaa" gap={16} /> */}
        </ReactFlow>
      </div>
    );
  }
}

export default OverviewFlow;
