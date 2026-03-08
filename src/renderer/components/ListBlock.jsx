import '../Styles/ListBlock.css'
import {useReactFlow} from "@xyflow/react";

export default function ListBlock({block, addNode}){
    const { screenToFlowPosition } = useReactFlow();

    const onAdd = (event) => {
        const position = screenToFlowPosition({x: event.clientX, y: event.clientY});

        let newNode;

        if(block.type === "code" || block.type === "composed") {
            addNode((num_nodes) => ({
                id: `${num_nodes+1}`,
                type: block.type,
                position: position,
                data: { label: block.name }
            }));
        } else if (block.type === "input") {
            addNode((num_nodes) => ({
                id: `${num_nodes + 1}`,
                type: "input",
                position: position,
                data: { label: `Input ${num_nodes + 1}` },
            }));
        } else if (block.type === "output") {
            addNode((num_nodes) => ({
                id: `${num_nodes + 1}`,
                type: "output",
                position: position,
                data: { label: `Output ${num_nodes + 1}` },
            }));
        }

        return false;
    };

    return(
       <div className = {block.type + "-list-block"} draggable={true} onDragEnd={onAdd}>
            <p>{block.name}</p>
       </div> 
    );

}