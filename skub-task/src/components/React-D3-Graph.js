import React from 'react';
import { Graph } from 'react-d3-graph';

const DataVisualization = () => {
  const data = {
    nodes: [
      { id: 'node1', label: 'Node 1', displayField1: 'Data A', displayField2: 'Data B' },
      { id: 'node2', label: 'Node 2', displayField1: 'Data C', displayField2: 'Data D' },
      { id: 'node3', label: 'Node 3', displayField1: 'Data E', displayField2: 'Data F' },
      { id: 'node4', label: 'Node 4', displayField1: 'Data G', displayField2: 'Data H' },
    ],
    links: [
      { source: 'node1', target: 'node2' },
      { source: 'node1', target: 'node3' },
      { source: 'node2', target: 'node3' },
      { source: 'node3', target: 'node4' },
      { source: 'node4', target: 'node1' },
    ],
  };

  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 400,
      highlightStrokeColor: 'green',
      renderLabel: true,
      labelProperty: node => `${node.label}`,
      renderLabel: true,
      labelProperty: node => `${node.label}`,
      customNodeShape: (nodeId, node, otherProps) => {
        const labelOffset = 60;
        const width = 120;
        const height = 100;
        const x = -width / 2;
        const y = -height / 2;

        return (
          <g>
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              style={{ fill: node.color || '#c3daff' }}
              {...otherProps}
            />
            <text
              x={x + width / 2}
              y={y + labelOffset}
              textAnchor="middle"
              fontSize="14px"
              fontWeight="bold"
              style={{ fill: '#000000' }}
            >
              {node.label}
            </text>
            <text
              x={x + width / 2}
              y={y + labelOffset + 20}
              textAnchor="middle"
              fontSize="12px"
              style={{ fill: '#000000' }}
            >
              {node.displayField1}
            </text>
            <text
              x={x + width / 2}
              y={y + labelOffset + 40}
              textAnchor="middle"
              fontSize="12px"
              style={{ fill: '#000000' }}
            >
              {node.displayField2}
            </text>
          </g>
        );
      },
    },
    link: {
      highlightColor: 'lightgreen',
    },
  };

  return (
    <div>
      <h1>Data Visualization</h1>
      <Graph
        id="graph-id"
        data={data}
        config={config}
      />
    </div>
  );
};

export default DataVisualization;
