
import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./target.css";
import { Avatar, Typography, Grid, Icon, Button,  TextField, MenuItem  } from "@mui/material";
import { useSelector } from "react-redux";
import { accountManager } from "../../server/accountManager/accountManager";
import getTheIcon from "../categoryCreator/icons";
import { iconsArrOfObjects } from "../categoryCreator/icons";
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import CreateCheckingAccount from "../CheckingAccountForm/CheckingAccountForm";
import Box from '@mui/material/Box';
import { v4 as uuidV4 } from 'uuid';




export default function Target({ accounts}) {
    const activeUser = useSelector(state => state.activeUser);
    const savingsAccount = accountManager.checkForSavingsAccount(activeUser.username);
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let targetDisplay;
    let buttonMessage;
    let transferingOptions = false;
    const [backupAccount, setBackupAccount] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    
let savingsBalance = 0;
let savingsCurrency = '';
let savingsId = '';

if(savingsAccount){
  savingsBalance = savingsAccount.balance;
  savingsCurrency = savingsAccount.currency;
  savingsId = savingsAccount.id;
  if(accounts){
    transferingOptions = true;
  }

}
  const deleteAccount=(savingsId)=>{
      if(savingsAccount){
        accountManager.removeSavingsAccount((savingsId));
    }
      }
    const deleteAndTransfer = (savingsId, recipientId) => {
      if (savingsAccount) {
        accountManager.transferAllFunds(savingsId, recipientId);
        accountManager.removeSavingsAccount((savingsId));
      }
    }

  

    if(savingsAccount){
        const now = (Math.round(((savingsAccount.balance/savingsAccount.target)*100)))
        const icon = savingsAccount.icon.toLowerCase();
        const leftSum = (savingsAccount.balance);
        if(now>=100){
          accountManager.cteateAchievent(activeUser.username)
            buttonMessage = 'Transfer your balance'
        }
        else if(now===100){
            buttonMessage = 'Create new savings target'
        }
      

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
                  onClick={handleOpenDeleteModal}
               >{buttonMessage}</Button>
           <img src="./assets/undraw_happy_announcement_re_tsm0.svg"></img>
        </div>
        }else{        targetDisplay =   
            <div className="targetWrapper">
                <Typography variant="h5" gutterBottom>
                Hello, {activeUser.username} you have {100- now }% left to reach your savings goal
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
        <Modal.Body><CreateCheckingAccount handleClose={handleClose} /></Modal.Body>
        </Box>
      </Modal>
     
           
        </div>
       

    }

    return (
        <Grid>
       {targetDisplay}
       {transferingOptions ? 
<Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                     <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <Typography>{`Transfer your money`}</Typography>
        
         <Typography>{`You have ${savingsBalance} ${savingsCurrency} left in your account.`}</Typography>
         <Grid className="wrapper">
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        value={backupAccount}
        onChange={(e)=> setBackupAccount(e.target.value)}
        helperText={`Please choose account to transfer your balance.`}
      >
        {accounts.map((option) =>(
          
          <MenuItem key={uuidV4()} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Typography>{`Note: This will delete your savings account. If you want to set new savings goal you will be able to create new savings account.`}</Typography>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" id="deleteConfirmBtn" onClick={()=>{
            deleteAndTransfer(savingsId, backupAccount)

          }}>
           Yes
          </Button>
        </Modal.Footer>

      </Modal> : 
      <Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton></Modal.Header>
<Modal.Body>
<Typography>{`Are you sure you want to delete your savings account?`}</Typography>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseDeleteModal}>
Close
</Button>
<Button variant="primary" id="deleteConfirmBtn" 
onClick={deleteAccount(savingsId)}>
Yes
</Button>
</Modal.Footer>
</Modal>
}
        </Grid>

    )
}