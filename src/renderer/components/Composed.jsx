import { Handle, Position } from '@xyflow/react';
import { useContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 

function ComposedNode(props) {
    let inputHandleStyle = { top: 40 };
    let outputHandleStyle = { top: 40 };

    const {global_blocks, setActiveBlock} = useContext(GlobalBlocksContext);

    return (
        <div className="composed" onDoubleClick={() => setActiveBlock(props.data.label)}>
            <div> {props.data.label} </div>
            {global_blocks[props.data.label].react_flow.initialNodes.map(node => 
                node.type === "input" ?
                    <Handle key={node.id} type="target" position={Position.Left} id={node.data.label} style={(() => {inputHandleStyle.top += 10; return structuredClone(inputHandleStyle);})()} /> :
                    node.type === "output" ?
                        <Handle key={node.id} type="source" position={Position.Right} id={node.data.label} style={(() => {outputHandleStyle.top += 10; return structuredClone(outputHandleStyle);})()} /> :
                        null
            )}
        </div>
    );
}

 
export default ComposedNode;