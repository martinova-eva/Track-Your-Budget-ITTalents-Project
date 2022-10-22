import './transactionPage.css';
import React, { useState } from "react";
import SelectElement from '../../components/selectElementForCategories/selectElement';
import { Input, Button, Box, Avatar, TextField } from '@mui/material';
import { possibleIncomeArr } from '../../components/categoryCreator/listOfAllIncomes';
import { possibleOutcomeArr } from '../../components/categoryCreator/listOfAllOutcomes'
import BasicDatePicker from '../../components/CheckingAccountForm/datePicker';
import { useNavigate } from 'react-router-dom';

export default function TransactionPage() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('');
  const [typeOfTransaction, setTypeOfTransaction] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  const handleCreateNewTransaction = () => {
    if (selectedAccount && typeOfTransaction && categoryName && date &&  amount && description ) {
      console.log(selectedAccount, typeOfTransaction, categoryName, date, amount, description);

      // {selectedAccount, typeOfTransaction, categoryName, date, description, amount}
      // navigate('/transactions');
      setSelectedAccount('');
      setTypeOfTransaction('');
      setCategoryName('');
      setDate(new Date());
      setDescription('');
      setAmount('');
    } else {
      alert('ooooppsss we can`t create new transactions')
    }

  }

  return (
    <div className='wrapper-select-elements'>
      <Box sx={{ border: 1, borderColor: 'paper', boxShadow: 5, display: "flex", flexDirection: 'column' }}>

        <Avatar className="fieldStyle" alt="logo" src="..\assets\10491-logo-wallet.png" size="lg" />
        <h2>Add a transaction</h2>
        <form className="transactionsInputs">
        <SelectElement className="select-element" title={"Choose account:"}
          value={selectedAccount}
          onChange={value => setSelectedAccount(value)}
        >
          {/* тези опции трябва да са динамични, според това колко сметки има юзера, value-то ще е account's id */}
          <option value='accountInLv'>Account in lv</option>
          <option value='accountInUSD'>Account in USD</option>
        </SelectElement>

        <SelectElement className="select-element" title={"Transaction type:"}
          value={typeOfTransaction}
          onChange={value => setTypeOfTransaction(value)}
        >
          <option value="income">Income</option>
          <option value="outcome">Outcome</option>
        </SelectElement>

        {typeOfTransaction === "income" ? <SelectElement className="select-element" title={"Choose from income category:"}
          value={categoryName}
          onChange={value => setCategoryName(value)}
        >
          {possibleIncomeArr.map((option, i) => <option key={i} value={option.title}>{option.title} </option>)}
        </SelectElement> :
          <SelectElement className="select-element" title={"Choose from outcome category:"}
            value={categoryName}
            onChange={value => setCategoryName(value)}
          >
            {possibleOutcomeArr.map((option, i) => <option key={i} value={option.title}>{option.title}</option>)}
          </SelectElement>}
        
          <BasicDatePicker 
            format="MM-dd-yyyy"
            value={date}
            onChange={value => setDate(value)}
          />
          <TextField
            type="number"
            variant='outlined'
            min={1}
            required
            fullWidth
            label="enter amount"
            value={amount}
            onChange={e => {
              console.log(e.target.value)
              setAmount(e.target.value)
            }}
          />
          <TextField
            type="text"
            variant='outlined'
            required
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


