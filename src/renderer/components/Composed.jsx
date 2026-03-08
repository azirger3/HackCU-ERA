import { Handle, Position } from '@xyflow/react';
 
function ComposedNode(props) {
    let inputHandleStyle = { top: 40 };
    let outputHandleStyle = { top: 40 };
    return (
        <div className="composed">
            <div> {props.data.label} </div>
            {props.data.global_blocks[props.data.label].react_flow.initialNodes.map(node => 
                node.type === "input" ?
                    <Handle type="target" position={Position.Left} id={node.data.label} style={(() => {inputHandleStyle.top += 10; return structuredClone(inputHandleStyle);})()} /> :
                    node.type === "output" ?
                        <Handle type="source" position={Position.Right} id={node.data.label} style={(() => {outputHandleStyle.top += 10; return structuredClone(outputHandleStyle);})()} /> :
                        null
            )}
        </div>
    );
}

 
export default ComposedNode;