import React from 'react';
import { Graph, DefaultLink, DefaultNode } from '@visx/network';
import { LinePath } from '@visx/shape';

const nodes = [
  { id: 'node1', label: 'Node 1', In: 11, Out: 8 },
  { id: 'node2', label: 'Node 2', In: 55, Out: 3 },
  { id: 'node3', label: 'Node 3', In: 34, Out: 20 },
];

const edges = [
  { id: 'edge1', source: 'node1', target: 'node2', label: 'Edge from Node 1 to Node 2' },
  { id: 'edge2', source: 'node1', target: 'node3', label: 'Edge from Node 1 to Node 3' },
  { id: 'edge3', source: 'node2', target: 'node3', label: 'Edge from Node 2 to Node 3' },
];

const VisxNetwork = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <h2>Data Visualization using Visx Network</h2>
      <Graph graph={{ nodes, links: edges }}>
        <DefaultNode />
        <DefaultLink lineComponent={LinePath} />
      </Graph>
    </div>
  );
};

export default VisxNetwork;
