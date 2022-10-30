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
import { Button, Paper, IconButton } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DropDownOptions from '../CheckingAccountForm/dropDownOptions';
import Target from '../target/target';


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
  const[backupAccount, setBackupAccount] = useState('');


  const [openDeleteModal, setOpenDeleteModal] = useState(false);  
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  // const [accounts, setAccounts] = useState(accountManager.getAllUserAccounts(owner.username));
  // const [savingsAccounts, setSavingsAccounts] = useState( accountManager.getAllSavingsAccounts(owner.username));

  
const accounts = accountManager.getAllUserAccounts(owner.username);
const savingsAccounts = accountManager.getAllSavingsAccounts(owner.username);
const savingsAccount = accountManager.checkForSavingsAccount(owner.username);
const deleteAccount=()=>{
  accountManager.removeSavingsAccount((savingsAccounts[0].id));
  navigate('/home');
}





  return (
    <>
    <Target savingsAccount={savingsAccount}></Target>
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
            <Typography  onClick={(e)=>{
              navigate(`/transactions/${account.id}`)
            }}
            >{`Checking account: ${account.name}`}</Typography>
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
           expandIcon={ <div id='deleteSavingsIcon'>
           <IconButton 
            aria-label="delete" size="small" onClick={handleOpenDeleteModal} >

                 <DeleteIcon fontSize="inherit" />
             </IconButton>
             </div>}>
            <Typography>{`Savings account: ${account.name}`}</Typography>
          </AccordionSummary>
        </Accordion>))}

        <Modal show={openDeleteModal} onHide={handleCloseDeleteModal}>
                     <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <Typography>{`Are you sure you want to delete your savings account?`}</Typography>
        
        {/* <Typography>{`You have ${savingsAccounts[0].balance} ${savingsAccounts[0].currency} left in your account.`}</Typography>
        <DropDownOptions    
            fullWidth
            helperText={`Please choose account to transfer your balance.`}
            arr={accounts}
            value={backupAccount}
            handleChange={(e)=> setBackupAccount(e.target.value)}>
            </DropDownOptions> */}
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="primary" id="deleteConfirmBtn" onClick={deleteAccount}>
           Yes
          </Button>
        </Modal.Footer>
      </Modal>




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
    </>
  );
}