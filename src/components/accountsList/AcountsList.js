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
import Modal from '@mui/material/Modal';
import CreateCheckingAccount from '../CheckingAccountForm/CheckingAccountForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};


export default function AccountsList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <div className="accountsWrapper">
      <h3>Your accounts</h3>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Checkings Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShortTransactionsList />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Savings Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ShortTransactionsList />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={true}>
        <AccordionSummary >


          
        
          <Typography onClick={handleOpen}>
            <AddCircleOutlineIcon className="addNewIcon"/>
            Add new account
          </Typography>
          <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <CreateCheckingAccount  onClose={handleClose}/>
        </Box>
      </Modal>
    </div>
          
         
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
