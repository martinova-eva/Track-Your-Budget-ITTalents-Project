
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";
import { Avatar, Typography, Grid, Icon, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { accountManager } from "../../server/accountManager/accountManager";
import getTheIcon from "../categoryCreator/icons";
import { iconsArrOfObjects } from "../categoryCreator/icons";
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import CreateCheckingAccount from "../CheckingAccountForm/CheckingAccountForm";
import Box from '@mui/material/Box';
import { useEffect } from 'react';

export default function Target({savingsAccount}) {
    const activeUser = useSelector(state => state.activeUser);
    
    //const[savingsAccount, setSavingsAccount ] = useState(accountManager.checkForSavingsAccount(activeUser.username))
    //const savingsAccount = accountManager.checkForSavingsAccount(activeUser.username);
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let targetDisplay;

    if(savingsAccount){
        const now = Math.round(((savingsAccount.balance/savingsAccount.target)*100))
        const icon = savingsAccount.icon.toLowerCase();
        const leftSum = (Math.round(savingsAccount.balance - savingsAccount.target)).toFixed(2);
      

        if(now >= 100){
            targetDisplay =  <div className="wellDoneTarget">
            <Typography variant="body1" gutterBottom>
            Well done, {activeUser.username} you have acheaved your savings goal!
      </Typography>
      <Typography variant="body1" gutterBottom>
           {leftSum? `${leftSum} ${savingsAccount.currency} left in your savings account.`: null}
      </Typography>

      <Button
                  type="button"
                  variant="contained"
                  size="large"
                  id="submitButton"
                  onClick={handleShow}
               >Create new savings goal</Button>

          <Modal show={show} onHide={handleClose}>
          <Box sx={{ borderColor: 'paper', boxShadow: 20, display: "flex", flexDirection: 'column'}}>
        <Modal.Header closeButton>    
        </Modal.Header>
        <Modal.Body><CreateCheckingAccount onClose={handleClose} /></Modal.Body>
        </Box>
      </Modal>

           <img src="./assets/undraw_happy_announcement_re_tsm0.svg"></img>
        </div>
        }else{        targetDisplay =   
            <div className="targetWrapper">
                <Typography variant="h5" gutterBottom>
                Hello, {activeUser.username} you have {100- now}% left to reach your savings goal
          </Typography>
                <div className="target">
                    <div className="progressBarContainer">
                        <ProgressBar variant="custom"  now={now} label={`${now}%`} />
                    </div>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: "white"}} > <Icon className="shortListIcon" >
                {iconsArrOfObjects.map(i => {
                    if (i.title.toLowerCase() === icon) {
                        return i.tag;
                        }
                    })
                }
                </Icon>
                </Avatar>
                </div>
            </div>

        }

       
    }
    else{   
        targetDisplay = 
        <div className="noTragetMessage">
            
           
        <img src="./assets/undraw_target_re_fi8j.svg"></img>
        <div className="createTargetBtn">
        <Typography variant="body1" gutterBottom>
            Hello, {activeUser.username} you don't have savings goal yet.
        </Typography>
        <Button
                  type="button"
                  variant="contained"
                  size="large"
                  id="submitButton"
                  onClick={handleShow}
               >Set new savings target</Button>
               </div>

<Modal show={show} onHide={handleClose}>
          <Box sx={{ borderColor: 'paper', boxShadow: 20, display: "flex", flexDirection: 'column'}}>
        <Modal.Header closeButton>    
        </Modal.Header>
        <Modal.Body><CreateCheckingAccount onClose={handleClose} /></Modal.Body>
        </Box>
      </Modal>
     
           
        </div>
       

    }

    return (
        <Grid>
       {targetDisplay}
        </Grid>
    )
}