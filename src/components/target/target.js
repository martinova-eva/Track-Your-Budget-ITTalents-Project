
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Avatar } from "@mui/material";


export default function Target() {
    const now = 60;
    return (
        <div className="targetWrapper">
            <h4> Hello, user you have x% left to reach your savings goal</h4>
            <div className="target">
                <div className="progressBarContainer">
                    <ProgressBar variant="custom"  now={60} label={`${now}%`} />
                </div>
                <Avatar   sx={{ width: 56, height: 56, bgcolor: "white"}} ><AirplanemodeActiveIcon className="targetImage" /></Avatar>
         
            </div>
        </div>
    )
}