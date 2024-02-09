import React, { Component } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import { DataSet } from 'vis-network/standalone/esm/vis-network';
// import 'vis-network/dist/vis-network.css'; // You can uncomment this if you want to apply default styles

class GraphComponent extends Component {
  componentDidMount() {
    this.initializeGraph();

  }

  initializeGraph() {
    const { nodes, edges } = this.props;

   
    const nodesWithLabels = nodes.map((node, index) => ({
      ...node,
      shape: 'box',
      label: `${node.label}\n\nIn: ${node.In}  Out: ${node.Out}`,
      //title: `${node.label}\nIn: ${node.In}\nOut: ${node.Out}`,//tooltip will come when hover on the node.
    }));


    // Create a data object containing nodes and edges
    const data = {
      nodes: new DataSet(nodesWithLabels), // Use DataSet from vis-network instead of vis
      edges: new DataSet(edges.map((edge) => ({ ...edge, title: `${edge.from} -> ${edge.to}` }))), // Add title property to edges
   };

    
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'LR', // 'LR' stands for Left-to-Right layout. Use 'UD' for Top-to-Bottom layout.
          sortMethod: 'hubsize', // 'hubsize', 'directed', 'improved'
          levelSeparation: 150, // Adjust this value to control the distance between nodes in the same level
          nodeSpacing: 200, // Adjust this value to set the minimum space between nodes
    
        },
      },
      nodes: {
        shape: 'box',
        font: {
          size: 18, 
        },
        color: {
          background: 'orange', // Set the default color of the nodes to orange
        },
        margin:10,
      },
      edges: {
        width: 2,//thickness of the edge
        length: 500, // Adjust the length to control the length of the edges
        color: 'pink',
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        } 
       
      },
      physics: {
      enabled: false, //  nodes waving physics simulation 
        repulsion: {
          //nodeDistance: 400, // Adjust this value to control the distance between nodes
          nodeDistance: 200, // Adjust this value to control the distance between nodes
   
        },
      },
      interaction: {
        hover: true, 
      },
      
      
      
    };

    
    const container = document.getElementById('graph-container');
    this.network = new Network(container, data, options);
    
    // container.style.cursor = 'pointer';
   
    // Bind the 'click' event to handle node clicks
    this.network.on('click', (event) => {
      if (event.nodes.length > 0) {
        const clickedNodeId = event.nodes[0];
        this.handleClickNode(clickedNodeId);
      }
    });
    this.network.on('hoverNode', (event) => {
      const { node } = event;
      const connectedEdges = this.network.getConnectedEdges(node);
      this.network.selectNodes([node]); 
    
      //this.network.body.data.nodes.update({ id: node, color: { background: 'pink' } });
      // connectedEdges.forEach((edgeId) => {
      //   this.network.body.data.edges.update({ id: edgeId, color: {  highlight: 'green' } });
      // });
      connectedEdges.forEach((edgeId) => {
        const edge = this.network.body.data.edges.get(edgeId);
        const { from, to } = edge;
        const isNextNodeEdge = from === node; // Check if the edge is connected to the next node
        const isPreviousNodeEdge = to === node; // Check if the edge is connected to the previous node
    
        if (isNextNodeEdge) {
          this.network.body.data.edges.update({ id: edgeId, color: { highlight: 'green' } });
        } else if (isPreviousNodeEdge) {
          this.network.body.data.edges.update({ id: edgeId, color: { highlight: 'red' } });
        }
      });

      //If you use CSS above then no need to use in setOptions which may get confuse.
      // this.network.setOptions({
      //   edges: {
      //     color: {
      //       highlight: 'red',
      //     },
      //   },
      // });

      this.network.selectEdges(connectedEdges, true); 
   
    });


    this.network.on('blurNode', (event) => {
      const { node } = event;
      //When UnHovering the nodes, it should back to previous colors 
      this.network.body.data.nodes.update({ id: node, color: { background: 'orange' } });
      

      const connectedEdges = this.network.getConnectedEdges(node);

      // Update the color of the connected edges back to their default color
      connectedEdges.forEach((edgeId) => {
        this.network.body.data.edges.update({ id: edgeId, color: {  highlight: 'pink' },width:2, });
      });
    });
    

    
  }

  handleClickNode(nodeId) {
    console.log("navigating to",nodeId)
   }
   render() {
    return (
      <>
      {/* <h2>Hi</h2> */}
      <div id="graph-container" style={{ height: '600px' }}></div>
    </>
    );
  }
}

export default GraphComponent;
