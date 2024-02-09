import React, { Component } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import { v4 as uuidv4 } from 'uuid';

class ReactVisNetwork extends Component {

  constructor(props) {
    super(props);
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      identifier: uuidv4()
    };

    this.container = React.createRef();
  }

  componentDidMount() {
    this.edges = new DataSet([
      { id: "edge1", from: 1, to: 5, title: " Node 1 to Node 2" }, 
      { id: "edge2", from: 1, to: 3, title: " Node 1 to Node 3" }, 
      { id: "edge3", from: 2, to: 6, title: " Node 2 to Node 3" },
      { id: "edge4", from: 4, to: 3, title: " Node 2 to Node 3" },
      { id: "edge5", from: 5, to: 3, title: " Node 2 to Node 3" },
      { id: "edge6", from: 2, to: 5, title: " Node 2 to Node 3" }, 
      { id: "edge7", from: 4, to: 2, title: " Node 2 to Node 3" }, 
    ]);

   this.nodes = new DataSet([
      { id: 1, label:  "Node 1\n\nIn: 11, Out: 8",  title: "In: 11, Out: 8", },
      { id: 2, label:  "Node 2\n\nIn: 111, Out:68",  },
      { id: 3, label: "Node 3\n\nIn: 111, Out: 68",  },
      { id: 4, label: "Node 4\n\nIn: 111, Out: 68",  },
      { id: 5, label: "Node 5\n\nIn: 111, Out: 68",  },
      { id: 6, label: "Node 6\n\nIn: 111, Out: 68",  },
    ]);

   this.updateGraph();
  }
 
  componentDidUpdate() {
   this.updateGraph();
  }
  updateGraph() {
    
    let defaultOptions = {
      physics: {
        stabilization: false
      },
      autoResize: false,
      edges: {
      smooth: false,// curve edges
       color: "#000000",
       width: 0.5,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      },
      nodes: {
        shape: "box", // Default shape for nodes
        font: {
          size: 18, 
        },
      },
    };


  // Merge user provided options with our default ones
  let options = {
    ...defaultOptions,
    ...this.props.options,
    physics: {
      enabled: false, // Disable physics simulation
    },
    layout: {
      hierarchical: {
        enabled: true,
        direction: "LR", // 'LR' stands for Left-to-Right layout. Use 'UD' for Top-to-Bottom layout.
        sortMethod: "directed", // 'hubsize', 'directed', 'improved'
        levelSeparation: 200, // Adjust this value to control the distance between nodes in the same level
        nodeSpacing: 300, // Adjust this value to set the minimum space between nodes
      },
    },
  };
  

    this.Network = new Network(
      this.container.current,
      {
       nodes: this.nodes,
        edges: this.edges,
      },
      options
    );

    this.Network.on("click", (event) => {
      if (event.nodes.length > 0) {
        const clickedNodeId = event.nodes[0];
        this.handleNodeClick(clickedNodeId); // Call your function here
      }
    });

    if (this.props.getNetwork) {
      this.props.getNetwork(this.Network);

   }

   

    // Add user provided events to network
   let events = this.props.events || {};
   for (let eventName of Object.keys(events)) {

     this.Network.on(eventName, events[eventName]);
    }
  }
  handleNodeClick(nodeId) {
    console.log("Handling click event for Node ID:", nodeId);
  }

  render() {
    const { identifier } = this.state;
    const { style } = this.props;
    return (
      <>
      <h2>vis-network lib</h2>
      <div
        id={identifier}
        ref={this.container}
        style={style}
      >
        
        {identifier}
        
      </div>
      </>
    );
  }
}


ReactVisNetwork.defaultProps = {
  style: { width: "100%", height: "100vh" }
};


export default ReactVisNetwork;



 