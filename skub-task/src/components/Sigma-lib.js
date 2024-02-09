import React, { Component } from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import { Graph } from 'graphology';

class SigmaComponent extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor called');
    this.graph = new Graph();
    this.generateNodes(this.graph);
    this.generateEdges(this.graph);
  }

  generateNodes(graph) {
    console.log('Generating nodes');
    graph.addNode('node1', { label: 'Node 1' });
    graph.addNode('node2', { label: 'Node 2' });
    graph.addNode('node3', { label: 'Node 3' });
  }

  generateEdges(graph) {
    console.log('Generating nodes');
    graph.addEdgeWithKey('edge1', 'node1', 'node2');
    graph.addEdgeWithKey('edge2', 'node1', 'node3');
    graph.addEdgeWithKey('edge3', 'node2', 'node3');
  }

  render() {
    console.log('Rendering GraphComponent');
    return (
      <div style={{ width: '800px', height: '600px' }}>
        <Sigma graph={this.graph}>
          <RandomizeNodePositions>
            <RelativeSize initialSize={15} />
          </RandomizeNodePositions>
        </Sigma>
      </div>
    );
  }
}

export default SigmaComponent;
