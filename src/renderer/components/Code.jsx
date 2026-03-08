import { Handle, Position } from '@xyflow/react';
import { useContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
 
function CodeNode(props) {
    let inputHandleStyle = { top: 40 };
    let outputHandleStyle = { top: 40 };

    const {global_blocks, setActiveBlock} = useContext(GlobalBlocksContext);

    return (
        <div className="code">
            <div> {props.data.label} </div>
            {global_blocks[props.data.label].inputs.map(node => 
                <Handle key={node.name} type="target" position={Position.Left} id={node.name} style={(() => {inputHandleStyle.top += 30; return structuredClone(inputHandleStyle);})()} >{node.name}</Handle>
            )}
            {global_blocks[props.data.label].outputs.map(node => 
                <Handle key={node.name} type="source" position={Position.Right} id={node.name} style={(() => {outputHandleStyle.top += 30; return structuredClone(outputHandleStyle);})()} >{node.name}</Handle>
            )}
        </div>
    );
}
 
export default CodeNode;