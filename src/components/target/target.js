
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Avatar, Typography, Grid } from "@mui/material";


export default function Target() {
    const now = 60;
    return (
        <Grid>
        <div className="targetWrapper">
            <Typography variant="h5" gutterBottom>
            Hello, user you have x% left to reach your savings goal
      </Typography>
            <div className="target">
                <div className="progressBarContainer">
                    <ProgressBar variant="custom"  now={60} label={`${now}%`} />
                </div>
                <Avatar   sx={{ width: 56, height: 56, bgcolor: "white"}} ><AirplanemodeActiveIcon className="targetImage" /></Avatar>
         
            </div>
        </div>
        </Grid>
    )
}