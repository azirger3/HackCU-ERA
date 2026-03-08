import { Handle, Position } from '@xyflow/react';
import { useCallback, useContext, useState, createContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
 
function InputNode(props) {
    const {setGlobalBlocks, activeBlock, global_blocks} = useContext(GlobalBlocksContext);

    const [editable, setEditable] = useState(false);

    const onChange = useCallback(lbl => {
        // Sanitize the input to prevent XSS attacks
        setGlobalBlocks((blocks_snapshot => {
            const nodes = blocks_snapshot[activeBlock].react_flow.initialNodes;
            console.log(nodes);
            console.log(props.data.label);
            console.log(lbl);
            for(let i = 0; i < nodes.length; i++) {
                if(nodes[i].data.label === props.data.label && nodes[i].type === "input") {
                    blocks_snapshot[activeBlock].react_flow.initialNodes[i].data.label = lbl;
                }
            }
            return blocks_snapshot;
        }));
    }, [global_blocks]);

    return (
        <div className="input" onDoubleClick={() => setEditable(() => true)}>
            {editable ? 
                <input type="text" value={props.data.label} onChange={(e) => onChange(e.target.value)} />
                :<div>{props.data.label}</div>
            }
            <Handle type="source" position={Position.Right} id="inputSource" />
        </div>
    );
}
 
export default InputNode;