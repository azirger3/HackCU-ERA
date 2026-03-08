import { Handle, Position } from '@xyflow/react';
import { useContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
 
function CodeNode(props) {
    let inputHandleStyle = { top: 10 };
    let outputHandleStyle = { top: 10 };

    const {global_blocks, setActiveCode} = useContext(GlobalBlocksContext);

    const numInputs = global_blocks[props.data.label].inputs.length;
    const numOutputs = global_blocks[props.data.label].outputs.length;


    return (
        <div className="code" style={{height: `calc(1em + ${30*Math.max(numInputs, numOutputs)+10}px)`}} onDoubleClick={() => setActiveCode(props.data.label)}>
            <div> {props.data.label} </div>
            {global_blocks[props.data.label].inputs.map(node => 
                <Handle key={node.name} type="target" position={Position.Left} id={node.name} style={(() => {inputHandleStyle.top += 30; return structuredClone(inputHandleStyle);})()} >
                    <span className="block_input">
                        {node.name}
                    </span>
                </Handle>
            )}
            {global_blocks[props.data.label].outputs.map(node => 
                <Handle key={node.name} type="source" position={Position.Right} id={node.name} style={(() => {outputHandleStyle.top += 30; return structuredClone(outputHandleStyle);})()} >
                    <span className="block_output">
                        {node.name}
                    </span>
                </Handle>
            )}
        </div>
    );
}
 
export default CodeNode;