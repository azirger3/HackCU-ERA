import { Handle, Position } from '@xyflow/react';
 
function CodeNode(props) {
    let inputHandleStyle = { top: 40 };
    let outputHandleStyle = { top: 40 };
    return (
        <div className="code">
            <div> {props.data.label} </div>
            {props.data.global_blocks[props.data.label].inputs.map(node => 
                <Handle type="target" position={Position.Left} id={node.name} style={(() => {inputHandleStyle.top += 10; return structuredClone(inputHandleStyle);})()} />
            )}
            {props.data.global_blocks[props.data.label].outputs.map(node => 
                <Handle type="source" position={Position.Right} id={node.name} style={(() => {outputHandleStyle.top += 10; return structuredClone(outputHandleStyle);})()} />
            )}
        </div>
    );
}
 
export default CodeNode;