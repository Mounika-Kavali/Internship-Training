import React from 'react';
import { MarkerType, Position } from 'reactflow';
import CustomNode from './CustomNode';


var Data={
  In:"20",
  Out:"30"
}
export const nodes = [
  

  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
      In:"22",
      Out:"33",
    },
    draggable: false,
    selectable: false,
  },
  {
    id: '5',
    type: 'output',
    data: {
      
      In:"22",
      Out:"33",
       label:<CustomNode />,
    },
    className: 'xyz',
    style: {
      
      
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      // background: 'brown',
      // color: 'white',
    //  border:'none'
    
    },
    data: {
      label:<CustomNode/>,
    },
    position: { x: 400, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  
];

export const edges = [
 
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    // label: 'this is an edge label' ,
    type: 'smoothstep',//step,Bezier,Straight
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.Arrow,
    },
    
  },
];
