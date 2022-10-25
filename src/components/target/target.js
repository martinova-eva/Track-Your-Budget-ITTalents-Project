
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Avatar, Typography, Grid, Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { accountManager } from "../../server/accountManager/accountManager";
import getTheIcon from "../categoryCreator/icons";
import { iconsArrOfObjects } from "../categoryCreator/icons";


export default function Target() {
    const activeUser = useSelector(state => state.activeUser);
    const savingsAccount = JSON.parse(localStorage.getItem("savings"))
    const now = (savingsAccount[0].balance/savingsAccount[0].target)*100;
    const icon = savingsAccount[0].icon;
    console.log(icon)
    const iconDisplay = iconsArrOfObjects.map(icon => {
        if(icon.title === icon){
            return (icon.tag);
        }
    })
    console.log();
    let targetDisplay;
  
    if(savingsAccount){
        targetDisplay =   
        <div className="targetWrapper">
            <Typography variant="h5" gutterBottom>
            Hello, {activeUser.username} you have {now}% left to reach your savings goal
      </Typography>
            <div className="target">
                <div className="progressBarContainer">
                    <ProgressBar variant="custom"  now={now} label={`${now}%`} />
                </div>
                <Avatar sx={{ width: 56, height: 56, bgcolor: "white"}} >{iconDisplay}</Avatar>
         
            </div>
        </div>
       
    }
    else{   
        targetDisplay = 
        <div className="targetWrapper">
            
            <Typography variant="h5" gutterBottom>
            Hello, {activeUser.username} you don't have savings goal yet.
        </Typography>
           
        </div>
       

    }

    
    return (
        <Grid>
       {targetDisplay}
        </Grid>
    )
}