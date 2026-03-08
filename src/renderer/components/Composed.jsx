import { Handle, Position } from '@xyflow/react';
 

 
function ComposedNode(props) {
    let inputHandleStyle = { bottom: -10 };
    let outputHandleStyle = { bottom: -10 };
    return (
    <div className="composed">
      <div> {props.data.label} </div>
      {props.data.global_blocks[props.data.label].react_flow.initialNodes.map(node => 
        node.type === "input" ?
            <Handle type="source" position={Position.Left} id="a" style={(() => {inputHandleStyle.bottom += 10; return inputHandleStyle;})()} /> :
            node.type === "output" ?
            <Handle type="source" position={Position.Right} id="a" style={(() => {outputHandleStyle.bottom += 10; return outputHandleStyle;})()} /> :
            null
      )}
    </div>
  );
}

 
export default ComposedNode;