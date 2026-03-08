import '../Styles/ListBlock.css'

export default function ListBlock({block}){

    // block.type ("code" or "composed")

    return(
       <div className = {block.type + "-list-block"}>
            <p>{block.name}</p>
       </div> 
    );

}