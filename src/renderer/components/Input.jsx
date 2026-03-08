import { Handle, Position } from '@xyflow/react';
 
function InputNode(props) {
  return (
    <div className="input">
      <div>Input Node</div>
      <Handle type="source" position={Position.Right} id="inputSource" />
    </div>
  );
}
 
export default InputNode;