import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShortTransactionsList from './ShortTransactionsList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./accountList.css"
import Box from '@mui/material/Box';
import CreateCheckingAccount from '../CheckingAccountForm/CheckingAccountForm';
import { accountManager } from '../../server/accountManager/accountManager';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Paper, IconButton, Grid, TextField, MenuItem } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DropDownOptions from '../CheckingAccountForm/dropDownOptions';
import Target from '../target/target';
import { Troubleshoot } from '@mui/icons-material';
import { v4 as uuidV4 } from 'uuid';
import BarChart from '../TrasnsactionsList/barChart';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function AccountsList() {
  const owner = useSelector(state => state.activeUser);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);  //bt
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [backupAccount, setBackupAccount] = useState('');


  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
 

  
const accounts = accountManager.getAllUserAccounts(owner.username);
const savingsAccounts = accountManager.getAllSavingsAccounts(owner.username);
const savingsAccount = accountManager.checkForSavingsAccount(owner.username);
let transferingOptions = false;
let savingsBalance = 0;
let savingsCurrency = '';
let savingsId = '';
if(savingsAccount){
  savingsBalance = savingsAccount.balance;
  savingsCurrency = savingsAccount.currency;
  savingsId = savingsAccount.id;
  if(savingsBalance>0 && accounts.length>0){
    transferingOptions = true;
  }

}

const deleteAccount=(savingsId)=>{
  if(savingsAccount){
    accountManager.removeSavingsAccount((savingsId));
  navigate('/home');
}
  }
  const deleteAndTransfer = (savingsId, recipientId) => {
    if (savingsAccount) {
      accountManager.transferAllFunds(savingsId, recipientId);
      accountManager.removeSavingsAccount((savingsId));
    }
  }


  let statisticsData = accountManager.showStatisticsByAccounts(owner.username);
  const [data, setData] = useState({
    labels: statisticsData.map(data => data.name),
    datasets: [{
         label: 'Checking accounts',
        data: statisticsData.map(data => data.balance),
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255,205,0)',
            'rgb(19,185,119)',
            'rgb(183,101,201)',
            'rgb(91,224,255)',
            'rgb(218, 57, 80)',
            'rgb(43,174,246)',
            'rgb(255,161,1)',
            'rgb(255,44,87)',
            'rgb(66,205,0)',
            'rgb(54, 122, 255)',
        ],
        hoverOffset: 4
    }]
});

  return (
    <>
      <Target savingsAccount={savingsAccount} accounts = {accounts}></Target>
      <div className="accountsWrapper" >
        <div className='accountsImageHeader'>
          <Typography variant="h5" >
            Your accounts
          </Typography>
        </div>

        {accounts.map(account => (
          <Accordion
            key={account.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography onClick={(e) => {
                navigate(`/transactions/${account.id}`)
              }}
              >{`${account.name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Typography className='accountBalanceShortList' variant="subtitle2">{`Account balance: ${account.balance} ${account.currency}`}</Typography>

              <ShortTransactionsList id={account.id} />
            </AccordionDetails>
          </Accordion>))}

        {savingsAccounts.map(account => (
          <Accordion
            expanded={false}
            key={account.id}
          >

            <AccordionSummary
              expandIcon={<div id='deleteSavingsIcon'>
                <IconButton
                  aria-label="delete" size="small" onClick={handleOpenDeleteModal} >

                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </div>}>
              <Typography 
              >{`Savings account: ${account.name}`}</Typography>
            </AccordionSummary>
          </Accordion>))}



        {transferingOptions ? 
<Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                     <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <Typography>{`Are you sure you want to delete account your savings account?`}</Typography>
        
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" id="deleteConfirmBtn" onClick={()=>{
            deleteAndTransfer(savingsId, backupAccount)
            handleCloseDeleteModal()
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

        <Accordion expanded={true}>
          <AccordionSummary >
            <Typography onClick={handleShow}>
              <AddCircleOutlineIcon className="addNewIcon" />
              Add new account
            </Typography>
            <Modal show={show} onHide={handleClose}>
              <Box sx={{ borderColor: 'paper', boxShadow: 20, display: "flex", flexDirection: 'column' }}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                  <CreateCheckingAccount handleClose={handleClose} />
                  </Modal.Body>
              </Box>
            </Modal>
          </AccordionSummary>
        </Accordion>
        {statisticsData.length>0 ? <div className='accountsbarChart'>
           <Typography >{`All checking accounts`}</Typography>
        <BarChart data={data}></BarChart></div> : null}
      </div>
    </>
  );
}