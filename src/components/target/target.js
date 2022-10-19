
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";



export default function Target() {
    const now = 60;
    return (
        <div className="targetWrapper">
            <h4> Hello, user you have x% left to reach your goal</h4>
            <div className="target">
                <div className="progressBarContainer">
                    <ProgressBar variant="custom"  now={60} label={`${now}%`} />
                </div>
                <img className="targetImage" src="http://localhost:3000/assets/homeLoan.png" alt="goal"></img>          
            </div>
        </div>
    )
}