import { Handle, Position } from '@xyflow/react';
import { useContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
 
function CodeNode(props) {
    let inputHandleStyle = { top: 40 };
    let outputHandleStyle = { top: 40 };

    const global_blocks = useContext(GlobalBlocksContext);

    return (
        <div className="code">
            <div> {props.data.label} </div>
            {global_blocks[props.data.label].inputs.map(node => 
                <Handle key={node.id} type="target" position={Position.Left} id={node.name} style={(() => {inputHandleStyle.top += 10; return structuredClone(inputHandleStyle);})()} />
            )}
            {global_blocks[props.data.label].outputs.map(node => 
                <Handle key={node.id} type="source" position={Position.Right} id={node.name} style={(() => {outputHandleStyle.top += 10; return structuredClone(outputHandleStyle);})()} />
            )}
        </div>
    );
}
 
export default CodeNode;