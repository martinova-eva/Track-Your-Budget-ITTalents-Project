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
//import Modal from '@mui/material/Modal';
import CreateCheckingAccount from '../CheckingAccountForm/CheckingAccountForm';
import { accountManager } from '../../server/accountManager/accountManager';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Paper } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { OpenInFullOutlined } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function AccountsList() {
  
  const navigate = useNavigate();
  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const owner = useSelector(state => state.activeUser);
  const accounts = accountManager.getAllUserAccounts(owner.username);
  const savingsAccounts = accountManager.getAllSavingsAccounts(owner.username);



  return (
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
            <Typography onClick={(e)=>{
              navigate(`/transactions/${account.id}`)
            }}
            >{`Checking account: ${account.name}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShortTransactionsList id={account.id} />
          </AccordionDetails>
        </Accordion>))}

        {savingsAccounts.map(account => (
        <Accordion
          key={account.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{`Savings account: ${account.name}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
           
          </AccordionDetails>
        </Accordion>))}

      <Accordion expanded={true}>
        <AccordionSummary >
          <Typography onClick={handleShow}>
            <AddCircleOutlineIcon className="addNewIcon" />
            Add new account
          </Typography>
          <Modal show={show} onHide={handleClose}>
          <Box sx={{ borderColor: 'paper', boxShadow: 20, display: "flex", flexDirection: 'column'}}>
        <Modal.Header closeButton>    
        </Modal.Header>
        <Modal.Body><CreateCheckingAccount onClose={handleClose} /></Modal.Body>
        </Box>
      </Modal>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}