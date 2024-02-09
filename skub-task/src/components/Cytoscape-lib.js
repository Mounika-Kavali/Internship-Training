import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);
class CytoscapeLib extends Component {
  constructor(props) {
    super(props);
    this.cy = null; // Reference to the Cytoscape instance
  }

  componentDidMount() {
    this.initializeGraph();
     this.applyLayout();
  }

  applyLayout() {
    this.cy.layout({
      name: 'dagre', // Use the dagre layout
      rankDir: 'LR', // Left-to-right direction
      spacingFactor: 1.5, // Adjust this value for spacing between nodes
      nodeDimensionsIncludeLabels: true,
      //autoungrabify: false,
    //   locked:false,
    }).run();
  }
  
  initializeGraph() {
    // Create a new Cytoscape instance
    this.cy = cytoscape({
      container: this.graphContainer, // HTML element to render the graph
      elements: [
        { data: { id: 'node1', label: 'Node 1',In:"29",Out:"33" },  },
        { data: { id: 'node2', label: 'Node 2',In:"22",Out:"31" },  },
        { data: { id: 'node3', label: 'Node 3',In:"84",Out:"53" },  },
        { data: { id: 'node4', label: 'Node 4',In:"74",Out:"13" }, },
        { data: { id: 'node5', label: 'Node 5',In:"21",Out:"62" },  },

        { data: { id: 'edge1', source: 'node1', target: 'node2' } },
        { data: { id: 'edge11', source: 'node1', target: 'node3' } },
        { data: { id: 'edge2', source: 'node2', target: 'node5' } },
        { data: { id: 'edge3', source: 'node3', target: 'node5' } },
        { data: { id: 'edge4', source: 'node4', target: 'node1' } },
    ],
    //  elements : {
    //   nodes: [
    //        { data: 
    //           {
    //            id: 'node1', 
    //            label: 'Node 1', 
    //            In: '29', 
    //            Out: '33' 
    //           } },
    //        { data: { id: 'node2', label: 'Node 2', In: '22', Out: '31' } },
    //     { data: { id: 'node3', label: 'Node 3', In: '84', Out: '53' } },
    //     { data: { id: 'node4', label: 'Node 4', In: '74', Out: '13' } },
    //     { data: { id: 'node5', label: 'Node 5', In: '21', Out: '62' } },
    //   ],
    //   edges: [
    //     { data: { id: 'edge1', source: 'node1', target: 'node2' } },
    //     { data: { id: 'edge11', source: 'node1', target: 'node3' } },
    //     { data: { id: 'edge2', source: 'node2', target: 'node5' } },
    //     { data: { id: 'edge3', source: 'node3', target: 'node5' } },
    //     { data: { id: 'edge4', source: 'node4', target: 'node1' } },
    //   ],
    // },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4286f4',
            shape: 'square', // Square shape for nodes
            // label: (ele) => {
            //     const data = ele.data(); 
            //     return `${data.label}`;
            // },
            'text-valign': 'center', 
            'text-halign': 'center',
            'text-wrap': 'wrap', 
            'width': '90px',
            'height': '80px', 
            'font-weight': 'bold', 
            'font-size': '12px',
            'color': '#fff',
            'padding': '3px', 
            'text-margin-y': '-5px', 
            // 'text-background-opacity': 1, 
            'text-background-color': 'orange', 
            'text-background-padding': '3px', 
            'text-background-shape': 'roundrectangle',
            
  
             content: (ele) =>
             `${ele.data("label")}\n\n\nIn:${ele.data("In")}     Out:${ele.data("Out")} `,
         

          }
          
        },
        
        
        {
          selector: 'edge',
          style: {
            'line-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#ccc', 
            'curve-style': 'bezier'
          }
        },
        {
            selector: '.highlighted-edge-outgoing', // Highlighted outgoing edges
            style: {
              'line-color': 'green',
              'target-arrow-color': 'green'
            }
        },
        {
            selector: '.highlighted-edge-incoming', // Highlighted incoming edges
            style: {
              'line-color': 'red',
              'target-arrow-color': 'red'
            }
        },
        {
          selector: ':selected', // Highlight selected elements
          style: {
            'border-width': 2,
            'border-color': '#333'
          }
        },
        {
            selector: '.highlighted-node', 
            style: {
              'background-color': 'pink', 
              'color': 'black',
            
            }
        },
        {
            selector: '.highlighted-edge', 
            style: {
                'line-color': 'yellow', 
                'target-arrow-color': 'yellow',
            }
          },

          
      ]
    });
   
    this.cy.autoungrabify( true );//when TRUE we cannot move the nodes.

    // Handle node click
    this.cy.on('tap', 'node', event => {
      const clickedNode = event.target;
      console.log('Clicked node id:', clickedNode.id());
    });

    // Highlight connected edges on hovering node
    this.cy.on('mouseover', 'node', event => {
        const hoveredNode = event.target;
        const connectedEdges = hoveredNode.connectedEdges();
        this.cy.elements().removeClass('highlighted-node').removeClass('highlighted-edge-outgoing').removeClass('highlighted-edge-incoming');

        hoveredNode.addClass('highlighted-node');
        connectedEdges.forEach(edge => {
            if (edge.source().id() === hoveredNode.id()) {
              edge.addClass('highlighted-edge-outgoing'); // Outgoing edges
            } else {
              edge.addClass('highlighted-edge-incoming'); // Incoming edges
            }
           
          });
       
      });

      this.cy.on('mouseover', 'edge', event => {
        const hoveredEdge = event.target;
        hoveredEdge.addClass('highlighted-edge');
        const connectedNodes = hoveredEdge.connectedNodes();
        // Increase the size of connected nodes
        connectedNodes.forEach(node => {
          node.addClass('highlighted-node');
        });
      });



    // Remove highlights on mouseout
       this.cy.on('mouseout', 'node', event => {
        const hoveredNode = event.target;
        this.cy.elements().removeClass('highlighted-node').removeClass('highlighted-edge-outgoing').removeClass('highlighted-edge-incoming');
      });
      this.cy.on('mouseout', 'edge', event => {
        const hoveredEdge = event.target;
        hoveredEdge.removeClass('highlighted-edge');
        const connectedNodes = hoveredEdge.connectedNodes();
        connectedNodes.forEach(node => {
          node.removeClass('highlighted-node');
        });
      });
  }

  

  componentWillUnmount() {
    // Destroy the Cytoscape instance to clean up
    if (this.cy) {
      this.cy.destroy();
      this.cy = null;
    }
  }

  render() {
    return (
      <div
        ref={el => (this.graphContainer = el)}
        style={{ width: '900px', height: '800px' }}
      ></div>
    );
  }
}

export default CytoscapeLib;