import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { down: 10 };
 
function CodeNode(props) {
  return (
    <div className="code">
      <div>Code Node</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} id="a" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="b" />
    </div>
  );
}
 
export default CodeNode;