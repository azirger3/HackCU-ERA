import { Handle, Position } from '@xyflow/react';
import { useCallback, useContext, useState, createContext } from 'react';
import { GlobalBlocksContext } from 'renderer/App'; 
import Modal from 'react-modal';
import Button from './Button';
 
function OutputNode(props) {
    const {setGlobalBlocks, activeBlock, global_blocks} = useContext(GlobalBlocksContext);

    const [editable, setEditable] = useState(null);

    const onChange = () => {
        // Sanitize the input to prevent XSS attacks
        setGlobalBlocks((blocks_snapshot => {
            const nodes = blocks_snapshot[activeBlock].react_flow.initialNodes;
            let newB = JSON.parse(JSON.stringify(blocks_snapshot));
            for(let i = 0; i < nodes.length; i++) {
                if(nodes[i].data.label === props.data.label && nodes[i].type === "output") {
                    if(editable !== null) {
                        newB[activeBlock].react_flow.initialNodes[i].data.label = editable;
                    }
                }
            }
            return newB;
        }));
    };

    return (
        <>
            <Modal
                isOpen={editable !== null}
                onRequestClose={() => setEditable(() => null)}
                contentLabel={"Rename Output"}
                className="new-comp-form"
                overlayClassName="new-block-overlay"
                >
                <div className="modal-header">
                    <span className="material-symbols-rounded" onClick={() => setEditable(() => null)}>close</span>
                    <Button type="button" onClick={() => {onChange(); setEditable(() => null)}} className="primary-button" buttonText="Save"/>
                </div>
                
                <div className="label-title" style={{marginBottom: "1rem"}}>Output Name:</div>
                <input className="modal-input" placeholder="Block Name" value={editable === null ? "" : editable} onChange={(e) => {setEditable(() => e.target.value)}} />
            </Modal>
            <div className="output" onDoubleClick={() => setEditable(() => props.data.label)}>
                <div>{props.data.label}</div>
                <Handle type="target" position={Position.Left} id="outputTarget" />
            </div>
        </>
    );
}

export default OutputNode;