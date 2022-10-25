import './transactionPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { Input, Button, Box, Avatar, TextField, MenuItem } from '@mui/material';
import { possibleIncomeArr } from '../../components/categoryCreator/listOfAllIncomes';
import { possibleOutcomeArr } from '../../components/categoryCreator/listOfAllOutcomes'
import BasicDatePicker from '../../components/CheckingAccountForm/datePicker';
import { useNavigate } from 'react-router-dom';
import { accountManager } from '../../server/accountManager/accountManager';
import { useSelector } from 'react-redux';

export default function TransactionPage() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  //const owner = useSelector(state => state.username);
 // const accounts = accountManager.getAllUserAccounts(owner); //като вземем успешно името!
//  let customCategories = accountManager.checkForUserCustomCategories(owner);
//  customCategories.map(c => {
//   if(c.type === "income"){
//     possibleIncomeArr.push(c);
//   }else{
//     possibleOutcomeArr.push(c);
//   }
//  })

  const handleCreateNewTransaction = () => {
    if (selectedAccount && typeOfTransaction && categoryName && date &&  amount ) {
      console.log(selectedAccount, typeOfTransaction, categoryName, `${date.$D}.${date.$M + 1}.${date.$y}`, amount, description);

      //let accountBalance = accountManager.checkAccountBalance(selectedAccount);
      //console.log(accountBalance);
      //if(accountBalance >= amount){
       
       // accountManager.addTransaction( date, typeOfTransaction, amount, description, selectedAccount, owner);
        // {selectedAccount, typeOfTransaction, categoryName, `${date.$D}.${date.$M + 1}.${date.$y}`, description, amount}
      // navigate('/transactions');
      //   setSelectedAccount('');
      //   setTypeOfTransaction('');
      //   setCategoryName('');
      //   setDate(new Date());
      //   setDescription('');
      //   setAmount('');
      // }else{
      //   alert('ooooppsss you don`t have enough money in this account');
      // }
      
    } else {
      alert('ooooppsss we can`t create new transactions');
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
          {/* тези опции трябва да са динамични, според това колко сметки има юзера, value-то ще е account's id */}          
          {/* {accounts.map((account, i) => ( <MenuItem key={account.id} value={account.id}>
              {account.name}
            </MenuItem>))} */}
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
          {possibleIncomeArr.map((option, i) => ( <MenuItem key={i} value={option.title}>
              {option.title}
            </MenuItem>))}
        </SelectElement> :
          <SelectElement className="select-element" title={"Choose from outcome category:"}
            value={categoryName}
            onChange={value => setCategoryName(value)}
          >
              {possibleOutcomeArr.map((option, i) => ( <MenuItem key={i} value={option.title}>
              {option.title}
            </MenuItem>))}
          </SelectElement>}
        
          <BasicDatePicker 
            format="MM-dd-yyyy"
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
          {/* {при АДД винаги трябва да сравнява дали има сума равна или по- голяма на посочената, 
          ако не - да извести и да не приема транзакзията/действия} */}
        </form>
      </Box>
    </div>
  )
}


