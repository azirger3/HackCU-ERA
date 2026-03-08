import { Handle, Position } from '@xyflow/react';

function OutputNode(props) {
    return (
        <div className="output">
            <div>{props.data.label}</div>
            <Handle type="target" position={Position.Left} id="outputTarget" />
        </div>
    );
};
 
export default OutputNode;