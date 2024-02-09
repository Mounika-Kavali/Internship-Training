import React, { Component } from 'react'
import ReactD3Graph from './components/React-D3-Graph'
import GraphComponent from './components/ReactGraphVis';
import ReactVisNetwork from './components/ReactVisNetwork';
import VisxGraph from './components/Visx';
import FlowVisualization from './components/ReactFlow/ReactFlow';
import ReactFlow2Graph from './components/ReactFlow/ReactFlow2';
import ReactFlowww from './components/ReactFlow/ReactFlowww';
import GojsLib from './components/Gojs-lib';
import CytoscapeLib from './components/Cytoscape-lib';
import "./App.css"
import SigmaComponent from './components/Sigma-lib';
import WorkflowGraph from './skubWithCytoscape/components/WorkflowGraph';
import OverviewFlow from './components/ReactFlow/ReactFlowww';

export class App extends Component {
  
  render() {
    // Sample data for nodes and edges for ReactGraphVis.js
  const nodes = [
    { id: 1, label: 'Node 1' ,In:23,Out:83},
    { id: 2, label: 'Node 2' ,In:3,Out:0},
    { id: 3, label: 'Node 3',In:2318,Out:21 },
    { id: 4, label: 'Node 4' ,In:73,Out:3},
    { id: 5, label: 'Node 5',In:81043,Out:3 },
    { id: 6, label: 'Node 6' ,In:123,Out:983},
   
  ];

  const edges = [
    { id: '1-2', from: 1, to: 2 },
    { id: '1-3', from: 1, to: 3 },
    { id: '1-4', from: 1, to: 4 },
    { id: '2-3', from: 2, to: 3 },
    { id: '5-2', from: 5, to: 2 },
    { id: '6-4', from: 6, to: 4 },
  ];
    return (
      <div>
        {/* <ReactD3Graph/> */}
         {/* <VisxGraph/> */}

{/* <ReactFlowww /> */}

        {/* <GraphComponent nodes={nodes} edges={edges} /> */}
        {/* <ReactVisNetwork/> */}
        {/* <FlowVisualization/>  */}
        {/* <ReactFlow2Graph/> */}
        {/* <OverviewFlow/> */}
        {/* <GojsLib/> */}



<WorkflowGraph/>

        {/* <CytoscapeLib/> */}
        {/* <SigmaComponent/> */}
        
      </div>
    )
  }
}

export default App