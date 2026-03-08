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
        }
    };

    return(
       <div className = {block.type + "-list-block"} draggable={true} onDragEnd={onAdd}>
            <p>{block.name}</p>
       </div> 
    );

}