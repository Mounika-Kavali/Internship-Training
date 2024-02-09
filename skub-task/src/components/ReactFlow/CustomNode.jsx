import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({data}) {
  console.log(data,"DATA")
  return (
    <>
        <div style={{width:"100%"}}>
            <div className="custom-node__header" style={{backgroundColor:"blue",padding:"5px"}}>
             <strong>custom node</strong>
            </div>
            <div className="custom-node__body" style={{backgroundColor:"lightgray",display:"flex",padding:"3px"}}>
              <div style={{width:"50%"}}>
                  <label>In:{data?data.In:""}</label>
                  <Handle type="source" position={Position.Right} id="handle-0"  />
        
              </div>
              <div  style={{width:"50%"}}>
                  <label>Out:{data?data.Out:""}</label>
                  <Handle type="source" position={Position.Right} id="handle-1"  />
        
              </div>
            </div>
      </div>
    </>
  );
}

export default CustomNode;
