import "../Styles/Button.css"
export default function Button({className, onClick, buttonText}){

    return(
        <div className = {className} onClick = {onClick}>
            <p>{buttonText}</p>
        </div>
    );
}