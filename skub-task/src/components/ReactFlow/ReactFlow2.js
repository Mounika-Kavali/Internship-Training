import React, { Component } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';


import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    data: { label: 'node-1',In:23,Out:44 },
    position: { x: 0, y: 0 },
    
  },
  {
    id: '2',
    data: { label: 'node-2' },
    position: { x: 300, y: 100 },
  },
  {
    id: '3',
    data: { label: 'node-3' },
    position: { x: 100, y: 200 },
  },
  {
    id: '4',
    data: { label: 'node-4' },
    position: { x: 400, y: 300 },
  },
];



const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'to the',    },
{ id: '1-3', source: '1', target: '3',  },
{ id: '2-4', source: '2', target: '4',}];

const edgeOptions = {
    animated: false,//dotted edges moving continuously
    type:'straight',// type can be step,straight,''
    style: {
      stroke: 'white',
    },
    
    
  };
  
  const connectionLineStyle = { stroke: 'white' };
  // const layoutSettings = {
  //   orientation: 'UD',
  //   nodeSpacing: 100, // Adjust this value to control the distance between nodes
  // };

class ReactFlow2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: initialNodes,
      edges: initialEdges,
    };
  }

  onNodesChange = (changes) => {
    this.setState((prevState) => ({
      nodes: applyNodeChanges(changes, prevState.nodes),
    }));
  };

  onEdgesChange = (changes) => {
    this.setState((prevState) => ({
      edges: applyEdgeChanges(changes, prevState.edges),
    }));
  };


  handleNodeClick = (event, node) => {
    console.log('Node clicked:', node.data.label);
    
  };

  render() {
    const { nodes, edges } = this.state;

    return (
      <div style={{ height: '630px', width: '100%' }}>
        <h2>reactflow Lib-2</h2>
        <ReactFlow
          nodes={nodes}
          edges={edges}
         
         
          onNodesChange={this.onNodesChange}
          onEdgesChange={this.onEdgesChange}
          fitView={true}
          onNodeClick={this.handleNodeClick}
          defaultEdgeOptions={edgeOptions}
          style={{
            backgroundColor: '#D3D2E5',
          }}
          
          connectionLineStyle={connectionLineStyle}
        >
           {/* <Controls /> */}
         {/* <Background variant="dots" gap={12} size={1} />  */}
        
        </ReactFlow>
      </div>
    );
  }
}

export default ReactFlow2;
