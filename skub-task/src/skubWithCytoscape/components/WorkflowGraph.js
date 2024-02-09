import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { connect } from 'react-redux';
import {getGraphDetails} from '../actions/workflow-action'
import Bucket from './bucket';
cytoscape.use(dagre);


class WorkflowGraph extends Component {
  constructor(props) {
    super(props);
    this.cy = null;
    this.state = {
        searchText: "", 
      };


    // Create the SVG image string
    this.svgImage = this.generateSvgImage(false);

    // Encode the SVG image
    this.encodedSvgImage = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.svgImage)}`;
  }
  generateSvgImage(isMatched) {
    const dynamicColor = isMatched ? "orange" : "blue"; 
    const dynamicWidth = this.widthBasedOnLabel();
    return `
      <svg width="900" height="1300px" stroke="blue" stroke-width="10" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="30%" fill="${dynamicColor}" /> 
        <rect y="30%" width="100%" height="70%" fill="white" /> 
      </svg>
    `;
  }
  widthBasedOnLabel() {
    const bucketGroups = this.props.bucket_groups;
    let minWidth;
  
    for (const bg of bucketGroups) {
      const labelLength = bg.description?bg.description.length:0; 
      if(labelLength<30){ //In:undefined Out:undefined
        minWidth = 2600;
    }else{
        minWidth = 1800;
    }
      const calculatedWidth = labelLength * 150; 
      minWidth = Math.max(minWidth, calculatedWidth);
    }
  
    return minWidth;
  }
  

  componentDidMount() {
    this.props.getGraphDetails();
    this.widthBasedOnLabel();
    this.nodes = this.props.bucket_groups.map((x) => ({
        data: {
          id: x.id,
          label: x.description,
        },
      }));
       this.edges =  this.props.transitions.map((transition) =>
        this.createEdge(transition, this.props.bucket_groups)
      );
      
 }
  
nodes = this.props.bucket_groups.map(x => ({
          data: {
            id: x.id,
            label: x.description,
            nam:x.name,
            
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

edges = this.props.transitions.map(transition => this.createEdge(transition, this.props.bucket_groups));


   

 
  componentDidUpdate(prevProps) {   
    if(this.edges.length==0){
        this.componentDidMount();
       
      } 
      this.widthBasedOnLabel();
      this.initializeGraph();

      this.applyLayout();
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
    console.log('Node data:', this.nodes);
    // Create a new Cytoscape instance
    this.cy = cytoscape({
      container: this.graphContainer, 
      elements: [...this.nodes, ...this.edges],
      

      style: [
        {
          selector: 'node',
          style: {
           
            shape: 'square', 
            'text-valign': 'center', 
            'text-halign': 'center',
            'text-wrap': 'wrap', 
            'width': (ele) => {
                let minWidth;
                const label = ele.data("label");
                const labelLength = label ? label.length : 0;
                
                if(labelLength<30){ //In:undefined Out:undefined
                    minWidth = 2600;
                }else{
                    minWidth = 1800;
                }
                const calculatedWidth = labelLength * 100; // Adjust this multiplier as needed
                return Math.max(minWidth, calculatedWidth);
               
            },
            'height': '1200px', 
            'font-weight': 'bold', 
            'font-size': '190px',
            'color': 'black',
            'padding': '3px', 
           
             'content': (ele) => {   
                const label = ele.data("label");
                const name=ele.data("nam");
                
                const In = ele.data("In") !== undefined ? "" : 'undefined';
                const Out =  ele.data("Out") !== undefined ? "" : 'undefined';
               
                // return <Bucket label={label} inData={In} outData={Out}/>;
                return `${label} \n\n\n\nIn:${In}     Out:${Out}`
                
            },
            "background-image":this.encodedSvgImage,
            "background-fit": "contain",
            "background-repeat": "no-repeat",
            'background-color': 'gray',
          }
          
        },
        
        
        {
          selector: 'edge',
          style: {
            'line-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#ccc', 
            'curve-style': 'bezier',
            'width':'40px',
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
        {
            selector: '.searched-node', 
            style: {
                'background-color': 'orange', 
                'color': 'red',
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
  
  handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
 
    if (searchText === "") {
      // Clear highlighting and return to default nodes
      this.setState({ searchText: "" });
      this.nodes = this.props.bucket_groups.map((node) => ({
        data: {
          id: node.id,
          label: node.description,
        },
      }));
    } else {
      // Highlight matching nodes
       
        const matchingNodes = this.props.bucket_groups.filter((node) =>
        node.description.toLowerCase().includes(searchText) );
     this.setState({ searchText, isMatched: matchingNodes.length > 0 });
     
      this.nodes = this.props.bucket_groups.map((node) => ({
        data: {
          id: node.id,
          label: node.description,
        },
        classes: matchingNodes.includes(node) ? "searched-node" : "",
      }));
      if (matchingNodes.length > 0) {
        // Zoom in on the matching nodes for 5 seconds
          this.cy.animate({
          zoom: 1.5, // You can adjust the zoom level as needed
          duration: 5000,
      })
    }
}
 
    // Reinitialize the graph with updated nodes
    this.initializeGraph();
    this.applyLayout();
    // Update the SVG image based on the new state
  this.updateSvgImage();
  };
  updateSvgImage() {
    const { isMatched } = this.state;
  
    this.svgImage = this.generateSvgImage(isMatched);
  
    // Update the encoded SVG image
    this.encodedSvgImage = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.svgImage)}`;
  }
 
  render() {
    console.log(this.edges,"EDGES")
    return (
        <div className="graph-parent-container">
            <div className='bucketSearchBar'>
                <input
                    type="text"
                    placeholder="Search for Buckets "
                    className='bucketSearchInput'
                    onChange={this.handleSearchChange}
                />
            </div>
       
        <div
          ref={(el) => (this.graphContainer = el)}
          style={{ width: "100%", height: "90vh",  }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
     console.log(state.item.bucketEdges,"state.item.bucketEdges"),
    {
    bucket_groups: state.item.bucketNodes,
    transitions:state.item.bucketEdges,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getGraphDetails: () => dispatch(getGraphDetails()),
      
     
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(WorkflowGraph);


