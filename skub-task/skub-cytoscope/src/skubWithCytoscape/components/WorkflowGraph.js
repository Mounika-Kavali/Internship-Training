import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { connect } from 'react-redux';
import {getGraphDetails} from '../actions/workflow-action'
cytoscape.use(dagre);




class WorkflowGraph extends Component {
  constructor(props) {
    super(props);
    this.cy = null; 
    
  }

  
nodes = this.props.bucket_groups.map(x => ({
          data: {
            id: x.id,
            label: x.description,
          },
        })
      );

    //    Define a function to create edges
 createEdge = (transition, bucketGroups) => {
  const destinationBucketId = transition.destination_bucket_id;
  const sourceBucketId = transition.source_bucket_id;

  let sourceId, targetId;

  for (const bucketGroup of bucketGroups) {
    for (const bucket of bucketGroup.buckets) {
      if (bucket.id === destinationBucketId) {
        targetId = bucketGroup.id;
        break; // Found a match, no need to continue searching
      }
    }
    if (targetId) {
      break; // Target assigned, exit the loop
    }
  }

  for (const bucketGroup of bucketGroups) {
    for (const bucket of bucketGroup.buckets) {
      if (bucket.id === sourceBucketId) {
        sourceId = bucketGroup.id;
        break; // Found a match, no need to continue searching
      }
    }
    if (sourceId) {
      break; // Source assigned, exit the loop
    }
  }

  return {
    data: {
      id: transition.id,
      source: sourceId,
      target: targetId,
    },
  };
};

// Map over transitions to create edges
edges = this.props.transitions.map(transition => this.createEdge(transition, this.props.bucket_groups));

   

  componentDidMount() {
     this.props.getGraphDetails();
  
    
  }
  componentDidUpdate(prevProps) {   
    // this.updateEdges();

      this.initializeGraph();
      this.applyLayout();
  }
  updateEdges() {
    this.edges = this.props.transitions
      .filter(transition =>
        this.eachBucket.some(buc => buc.data.id === transition.source_bucket_id) &&
        this.eachBucket.some(buc => buc.data.id === transition.destination_bucket_id)
      )
      .map(transition => ({
        data: {
          id: transition.id,
          source: transition.source_bucket_id,
          target: transition.destination_bucket_id,
        },
      }));

    
  }

  applyLayout() {
    this.cy.layout({
      name: 'dagre', // Use the dagre layout
      rankDir: 'LR', // Left-to-right direction
      spacingFactor: 1.5, // Adjust this value for spacing between nodes
      rankSep: 200, // Separation between ranks (rows)
      nodeSep: 100, // Separation between nodes in the same rank (column)
      edgeSep: 50, // Separation between edges
      fit: true,
      nodeDimensionsIncludeLabels: true,
      
    }).run();
  }
  
  initializeGraph() {
    // Create a new Cytoscape instance
    this.cy = cytoscape({
      container: this.graphContainer, 
      elements: [...this.nodes, ...this.edges],

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4286f4',
            shape: 'square', // Square shape for nodes
            'text-valign': 'center', 
            'text-halign': 'center',
            'text-wrap': 'wrap', 
            'width': '1800',
            'height': '600px', 
            'font-weight': 'bold', 
            'font-size': '120px',
            'color': '#fff',
            'padding': '3px', 
            'text-margin-y': '-5px', 
            'text-background-opacity': 1, 
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
            'curve-style': 'bezier',
            'width':'20px',
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
      console.log('Clicked node ID:'+ clickedNode.id(),"Name:"+clickedNode.data('label'));
      
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
    console.log(this.edges,"EDGES")
    return (
      <div
        ref={el => (this.graphContainer = el)}
        style={{ width: '100%', height: '100vh', }}
      >
        
        
      </div>
    );
  }
}

const mapStateToProps = (state) => (
    console.log(state.item.bucketNodes,"state.item.bucketNodes"),{
    bucket_groups: state.item.bucketNodes,
    transitions:state.item.bucketEdges,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getGraphDetails: () => dispatch(getGraphDetails()),
      
     
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowGraph);


