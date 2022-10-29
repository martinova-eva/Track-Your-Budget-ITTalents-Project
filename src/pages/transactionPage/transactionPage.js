import './transactionPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { Button, Box, Avatar, TextField, MenuItem, Alert, AlertTitle } from '@mui/material';
import { possibleIncomeArr } from '../../components/categoryCreator/listOfAllIncomes';
import { possibleOutcomeArr } from '../../components/categoryCreator/listOfAllOutcomes'
import BasicDatePicker from '../../components/CheckingAccountForm/datePicker';
import { useNavigate } from 'react-router-dom';
import { accountManager } from '../../server/accountManager/accountManager';
import { useSelector } from 'react-redux';
import getTheIcon, { iconsArrOfObjects } from '../../components/categoryCreator/icons';

export default function TransactionPage() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [iconTitle, setIconTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [missingData, setMissingData] = useState(false);
  const [balance, setBalance] = useState(false);

  const owner = useSelector(state => state.activeUser);
  const accounts = accountManager.getAllUserAccounts(owner.username); 
  
  accountManager.checkForUserCustomCategories(owner.username);

  const handleCreateNewTransaction = () => {
    if (selectedAccount && typeOfTransaction && categoryName && date && (amount > 0)) {
     // console.log(selectedAccount, typeOfTransaction, categoryName, `${date.$D}.${date.$M + 1}.${date.$y}`, amount, description);
      
      let accountBalance = accountManager.checkAccountBalance(selectedAccount, owner.username);
          if (accountBalance >= Number(amount) && typeOfTransaction === 'outcome') {
            setMissingData(false)
            setBalance(false);
            accountManager.addTransaction(categoryName, `${date.$M + 1}.${date.$D}.${date.$y}`, typeOfTransaction, amount, description, iconTitle, selectedAccount, owner.username);
            navigate('/home');
            setSelectedAccount('');
            setTypeOfTransaction('');
            setCategoryName('');
            setDate(new Date());
            setDescription('');
            setIconTitle('');
            setAmount('');

          }else if(typeOfTransaction === 'income'){
            setMissingData(false)
            setBalance(false);
            accountManager.addTransaction(categoryName, `${date.$M + 1}.${date.$D}.${date.$y}`, typeOfTransaction, amount, description, iconTitle, selectedAccount, owner.username);
            navigate('/home');
            setSelectedAccount('');
            setTypeOfTransaction('');
            setCategoryName('');
            setDate(new Date());
            setDescription('');
            setIconTitle('');
            setAmount('');
          } else {
            setMissingData(false)
            setBalance(true);
           // alert('ooooppsss you don`t have enough money in this account');
          }

    } else {
      setMissingData(true)
      setBalance(false);
     // alert('ooooppsss we can`t create new transactions');
    }
  }
  return (
    <div className='wrapper-select-elements'>
      <Box sx={{ borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column' }}>

      {missingData ? <Alert variant="outlined" severity="warning"> Missing data!</Alert> : null}
      {balance ? <Alert variant="outlined" severity="warning"> You don`t have enough money in this account!</Alert> : null}

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
            {<MenuItem key={'income'} value={'income'}>{'Income'}</MenuItem>}
            {<MenuItem key={'outcome'} value={'outcome'}>{'Outcome'}</MenuItem>}
          </SelectElement>

          {typeOfTransaction === "income" ? <SelectElement className="select-element" title={"Choose from income category:"}
            value={categoryName}
            onChange={value => setCategoryName(value)}
          >
            {possibleIncomeArr.map((option, i) => (<MenuItem key={i} value={option.title}>
              {option.tag}{option.title}
            </MenuItem>))}
          </SelectElement> :
            <SelectElement className="select-element" title={"Choose from outcome category:"}
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
          
          <Button type="button" onClick={handleCreateNewTransaction}>Add transaction</Button>
        </form>
      </Box>
    </div>
  )
}


