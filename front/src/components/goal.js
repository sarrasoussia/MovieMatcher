import React from "react";
import "./goal.css"
function Goal (props) {
    return(
        <div className="goalstyle">
            <h5> {props.title} </h5>
            <p>{props.description}</p>
        </div>
    );
}

export default Goal