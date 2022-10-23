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
import { accountManager } from '../../server/accountManager/accountManager';

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
  const accounts = accountManager.accounts;


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
            <Typography>{account.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShortTransactionsList />
          </AccordionDetails>
        </Accordion>))}


      <Accordion expanded={true}>
        <AccordionSummary >




          <Typography onClick={handleOpen}>
            <AddCircleOutlineIcon className="addNewIcon" />
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
                <CreateCheckingAccount onClose={handleClose} />
              </Box>
            </Modal>
          </div>


        </AccordionSummary>
      </Accordion>
    </div>
  );
}
