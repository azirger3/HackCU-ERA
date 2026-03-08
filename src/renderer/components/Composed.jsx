import { Handle, Position } from '@xyflow/react';
import { useContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
import '../Styles/Composed.css'
function ComposedNode(props) {
    let inputHandleStyle = { top: 10 };
    let outputHandleStyle = { top: 10 };

    const {global_blocks, setActiveBlock} = useContext(GlobalBlocksContext);

    const numInputs = global_blocks[props.data.label].react_flow.initialNodes.filter(node => node.type == "input").length;
    const numOutputs = global_blocks[props.data.label].react_flow.initialNodes.filter(node => node.type == "output").length;

    return (
        <div className="composed" onDoubleClick={() => setActiveBlock(props.data.label)} style={{height: `calc(1em + ${30*Math.max(numInputs, numOutputs)+10}px)`}}>
            <div> {props.data.label} </div>
            {global_blocks[props.data.label].react_flow.initialNodes.map(node => 
                node.type === "input" ?
                    <Handle key={node.id} type="target" position={Position.Left} id={node.data.label} style={(() => {inputHandleStyle.top += 30; return structuredClone(inputHandleStyle);})()} >
                        <span className="block_input">
                            {node.data.label}
                        </span>
                    </Handle> :
                    node.type === "output" ?
                        <Handle key={node.id} type="source" position={Position.Right} id={node.data.label} style={(() => {outputHandleStyle.top += 30; return structuredClone(outputHandleStyle);})()} >
                            <span className="block_output">
                                {node.data.label}
                            </span>
                        </Handle> :
                        null
            )}
        </div>
    );
}

 
export default ComposedNode;