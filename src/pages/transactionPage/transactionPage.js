import './transactionPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { Button, Box, Avatar, TextField, MenuItem, Alert, IconButton } from '@mui/material';
import { possibleIncomeArr } from '../../components/categoryCreator/listOfAllIncomes';
import { possibleOutcomeArr } from '../../components/categoryCreator/listOfAllOutcomes'
import BasicDatePicker from '../../components/CheckingAccountForm/datePicker';
import { useNavigate } from 'react-router-dom';
import { accountManager } from '../../server/accountManager/accountManager';
import { useSelector } from 'react-redux';
import getTheIcon, { iconsArrOfObjects } from '../../components/categoryCreator/icons';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TransactionPage() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [iconTitle, setIconTitle] = useState('');
  const [date, setDate] = useState(accountManager.getCurrentDate());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [missingData, setMissingData] = useState(false);
  const [balance, setBalance] = useState(false);

  const owner = useSelector(state => state.activeUser);
  const accounts = accountManager.getAllUserAccounts(owner.username);

  accountManager.checkForUserCustomCategories(owner.username);

  const handleCreateNewTransaction = () => {
    if (selectedAccount && typeOfTransaction && categoryName && date && (amount > 0)) {
      let accountBalance = accountManager.checkAccountBalance(selectedAccount, owner.username);
      if (accountBalance >= Number(amount) && typeOfTransaction === 'outcome') {

        setMissingData(false)
        setBalance(false);
        accountManager.addTransaction(categoryName, `${date.$M + 1}.${date.$D}.${date.$y}`, typeOfTransaction, amount, description, iconTitle, selectedAccount, owner.username);
        navigate('/home');
        setSelectedAccount('');
        setTypeOfTransaction('');
        setCategoryName('');
        setDate(accountManager.getCurrentDate());
        setDescription('');
        setIconTitle('');
        setAmount('');

      } else if (typeOfTransaction === 'income') {
        setMissingData(false)
        setBalance(false);
        accountManager.addTransaction(categoryName, `${date.$M + 1}.${date.$D}.${date.$y}`, typeOfTransaction, amount, description, iconTitle, selectedAccount, owner.username);
        navigate('/home');
        setSelectedAccount('');
        setTypeOfTransaction('');
        setCategoryName('');
        setDate(accountManager.getCurrentDate());
        setIconTitle('');
        setAmount('');
      } else {
        setMissingData(false)
        setBalance(true);
      }
    } else {
      setMissingData(true);
      setBalance(false);
    }
  }
  return (
    <div className='wrapper-select-elements'>

      <Box sx={{ borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column' }}>
       
        <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
        <h2>Add a transaction</h2>
        <form className="transactionsInputs">
          <SelectElement className="select-element" title={"Choose account:"}
            value={selectedAccount}
            onChange={value => setSelectedAccount(value)}
          >
            {accounts.map((account, i) => (<MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>))}
          </SelectElement>

          <SelectElement className="select-element" title={"Transaction type:"}
            value={typeOfTransaction}
            onChange={value => setTypeOfTransaction(value)}
          >
            {<MenuItem key={'income'} value={'income'}>{'Incomes'}</MenuItem>}
            {<MenuItem key={'outcome'} value={'outcome'}>{'Expenses'}</MenuItem>}
          </SelectElement>

          {typeOfTransaction === "income" ? <SelectElement className="select-element" title={"Choose from incomes:"}
            value={categoryName}
            onChange={value => setCategoryName(value)}
          >
            {possibleIncomeArr.map((option, i) => (<MenuItem key={i} value={option.title}>
              {option.tag}{option.title}
            </MenuItem>))}
          </SelectElement> :
            <SelectElement className="select-element" title={"Choose from expenses:"}
              value={categoryName}
              onChange={value => setCategoryName(value)}
            >
              {possibleOutcomeArr.map((option, i) => (<MenuItem key={i} value={option.title}>
                {option.tag} {option.title} 
              </MenuItem>))}
            </SelectElement>}

          <BasicDatePicker
            value={date}
            onChange={value => setDate(value)}
          />
          <TextField
            type="number"
            variant='outlined'
            InputProps={{ inputProps: { min: 0 } }}
            required
            fullWidth
            label="enter amount"
            value={amount}
            onChange={e => {
              setAmount(e.target.value)
            }}
          />
          <TextField
            type="text"
            variant='outlined'
            fullWidth
            label="transaction description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
              {missingData ? <Alert
                      variant="outlined" severity="error"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setMissingData(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      Invalid data!
                    </Alert>
                      : null}
              {balance ? <Alert
                variant="outlined" severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setBalance(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                You don`t have enough money in this account!
              </Alert> : null}
          <Button type="button" onClick={handleCreateNewTransaction}>Add transaction</Button>
          
        </form>
      </Box>
     
    </div>
  )
}