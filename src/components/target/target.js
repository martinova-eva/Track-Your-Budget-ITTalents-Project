
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
    const savingsAccount = accountManager.checkForSavingsAccount(activeUser.username);
  
 
   
    console.log();
    let targetDisplay;
  
    if(savingsAccount){

        const now = Math.round(((savingsAccount.balance/savingsAccount.target)*100))
        const icon = savingsAccount.icon;
        const iconDisplay = getTheIcon(icon);
        targetDisplay =   
        <div className="targetWrapper">
            <Typography variant="h5" gutterBottom>
            Hello, {activeUser.username} you have {100- now}% left to reach your savings goal
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