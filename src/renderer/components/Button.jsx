import "../Styles/Button.css"
export default function Button({className, onClick, buttonText, type}){

    return(
        <button className = {className} onClick = {onClick} type = {type}>
            <p>{buttonText}</p>
        </button>
    );
}