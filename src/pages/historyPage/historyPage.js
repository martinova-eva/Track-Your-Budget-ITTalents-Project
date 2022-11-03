import Target from '../../components/target/target';
import './historyPage.css';
import { useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { accountManager } from '../../server/accountManager/accountManager';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Box, display } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { v4 as uuidV4 } from 'uuid';
import { TextField, Typography } from '@mui/material';

export default function HistoryPage() {
    const owner = useSelector(state => state.activeUser);
    const navigate = useNavigate();
    const savingsAccount = accountManager.checkForSavingsAccount(owner.username);
    const allUserAchievments = accountManager.checkForAchievments(owner.username);

    return (
        <>
        <div className='historyPage'>
       <img className='achievePic' src='./assets/undraw_astronaut_re_8c33.svg'></img>
        <Box sx={{ borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column',  mx: '6rem',alignItems:'center' }}>
   <Typography variant='h4'>History of your achievments:</Typography>
        <List component="nav" aria-label="mailbox folders">
           
        <ListItemText key={uuidV4()} />
            {allUserAchievments.map(a => (<ListItem key={uuidV4()} divider>
                <CheckIcon color="success" key={uuidV4()}/>   <ListItemText key={uuidV4()} primary={a.title} />
            </ListItem>))
            }
    </List>
    </Box>
    </div> 
        </>
    )
}