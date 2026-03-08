import '../Styles/ListBlock.css'

export default function ListBlock({title, blocks}){
    const block = blocks[title];

    // block.type ("code" or "composed")

    return(
       <div className = "list-block-container">
            <p>Test</p>
       </div> 
    );

}