import { Handle, Position } from '@xyflow/react';
 
function InputNode(props) {
    return (
        <div className="input">
            <div>{props.data.label}</div>
            <Handle type="source" position={Position.Left} id="inputSource" />
        </div>
    );
}
 
export default InputNode;