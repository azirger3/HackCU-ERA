import '../Styles/ListBlock.css'

export default function ListBlock({block}){

    // block.type ("code" or "composed")

    return(
       <div className = "list-block-container">
            <p>{block.name}</p>
       </div> 
    );

}